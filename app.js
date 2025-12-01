
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('show');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    if(window.innerWidth <= 768) {
                        document.querySelector('nav ul').classList.remove('show');
                    }
                }
            });
        });

        const audioPlayer = document.getElementById('audioPlayer');
        const audioElement = document.getElementById('audioElement');
        const nowPlayingTitle = document.getElementById('nowPlayingTitle');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const closePlayer = document.getElementById('closePlayer');
        
        const songs = [
            {
                id: 'song1',
                title: 'Morning Serenade',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            },
            {
                id: 'song2',
                title: 'Whispering Winds',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
            },
            {
                id: 'song3',
                title: 'Moonlight Sonata',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
            },
            {
                id: 'song4',
                title: 'Ocean Waves',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
            }
        ];
        
        let currentSongIndex = 0;
        let isPlaying = false;
        
        function playSong(songId) {
            const songIndex = songs.findIndex(song => song.id === songId);
            if (songIndex !== -1) {
                currentSongIndex = songIndex;
                const song = songs[songIndex];
                
                audioElement.src = song.src;
                nowPlayingTitle.textContent = song.title;
                
                audioPlayer.style.display = 'block';
                audioElement.play();
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                showNotification(`Now playing: ${song.title}`);
            }
        }
        
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioElement.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audioElement.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        
        prevBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            const song = songs[currentSongIndex];
            audioElement.src = song.src;
            nowPlayingTitle.textContent = song.title;
            audioElement.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            showNotification(`Now playing: ${song.title}`);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            const song = songs[currentSongIndex];
            audioElement.src = song.src;
            nowPlayingTitle.textContent = song.title;
            audioElement.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            showNotification(`Now playing: ${song.title}`);
        });
        
        closePlayer.addEventListener('click', function() {
            audioPlayer.style.display = 'none';
            audioElement.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        document.querySelectorAll('.play-overlay').forEach(button => {
            button.addEventListener('click', function() {
                const songId = this.getAttribute('data-song');
                playSong(songId);
            });
        });
        
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const closeModal = document.getElementById('closeModal');
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                videoFrame.src = videoUrl + '?rel=0&modestbranding=1';
                videoModal.style.display = 'flex';
                showNotification('Video loading...');
            });
        });
        
        closeModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoFrame.src = '';
        });
        
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = '';
            }
        });
        
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showNotification(`Thank you for subscribing with ${email}! You'll receive updates on new music and events.`);
            this.reset();
        });
        
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 3000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
                max-width: 300px;
                font-weight: 500;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                showNotification('Welcome to DIVA\'s musical world! Click play to enjoy soft melodies.');
            }, 1000);
        });