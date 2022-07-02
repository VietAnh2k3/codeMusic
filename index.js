

$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const playlist = $('.playlist')
const nameSong = $('.name_song');
const audio = $('#audio')
const cdImg = $('.cd-img');
const toggleBtn = $('.control_wrap')
const progress = $('#progress')
const cd = $('.cd');
const nextSong = $('.control_next')
const prevSong = $('.control_prev')
const randomSong = $('.control_random')
const undoSong = $('.control_undo')


const app = {
    currentIndex:0,
    isPlaying:false,
    randomMusic:false,
    undoMusic:false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
    setConfig:function(key,value){
        this.config[key]=value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    songs:[
        {
            name:'mashup rapcoustic 2',
            singer:'Đen Vâu',
            path:'./assets/music/mashup-rapcoustic-2.mp3',
            image:'./assets/img/OIP.jfif'
        },
        {
            name:'Shay Nanggg',
            singer:'Obito',
            path:'./assets/music/Shay-Nanggg-AMEE-Obito.mp3',
            image:'./assets/img/R.jfif'
        },
        {
            name:'Vi Me Anh Bat Chia Tay',
            singer:'Đen Vâu',
            path:'./assets/music/Vi-Me-Anh-Bat-Chia-Tay-Miu-Le-Karik-Chau-Dang-Khoa.mp3',
            image:'./assets/img/karik-sinh-nam-bao-nhieu-1.jpg'
        },
        {
            name:'mashup rapcoustic 2',
            singer:'Đen Vâu',
            path:'./assets/music/mashup-rapcoustic-2.mp3',
            image:'./assets/img/tha.jfif'
        },
        {
            name:'Shay Nanggg',
            singer:'Obito',
            path:'./assets/music/Shay-Nanggg-AMEE-Obito.mp3',
            image:'./assets/img/the.jfif'
        },
        {
            name:'Vi Me Anh Bat Chia Tay',
            singer:'Đen Vâu',
            path:'./assets/music/Vi-Me-Anh-Bat-Chia-Tay-Miu-Le-Karik-Chau-Dang-Khoa.mp3',
            image:'./assets/img/th.jfif'
        },
        {
            name:'mashup rapcoustic 2',
            singer:'Đen Vâu',
            path:'./assets/music/mashup-rapcoustic-2.mp3',
            image:'./assets/img/OIP.jfif'
        },
        {
            name:'Shay Nanggg',
            singer:'Obito',
            path:'./assets/music/Shay-Nanggg-AMEE-Obito.mp3',
            image:'./assets/img/R.jfif'
        },
        {
            name:'Vi Me Anh Bat Chia Tay',
            singer:'Đen Vâu',
            path:'./assets/music/Vi-Me-Anh-Bat-Chia-Tay-Miu-Le-Karik-Chau-Dang-Khoa.mp3',
            image:'./assets/img/karik-sinh-nam-bao-nhieu-1.jpg'
        },
        {
            name:'mashup rapcoustic 2',
            singer:'Đen Vâu',
            path:'./assets/music/mashup-rapcoustic-2.mp3',
            image:'./assets/img/OIP.jfif'
        },
        {
            name:'Shay Nanggg',
            singer:'Obito',
            path:'./assets/music/Shay-Nanggg-AMEE-Obito.mp3',
            image:'./assets/img/R.jfif'
        },
        {
            name:'Vi Me Anh Bat Chia Tay',
            singer:'Đen Vâu',
            path:'./assets/music/Vi-Me-Anh-Bat-Chia-Tay-Miu-Le-Karik-Chau-Dang-Khoa.mp3',
            image:'./assets/img/karik-sinh-nam-bao-nhieu-1.jpg'
        }

    ],

    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })

        
    },
    render:function(){
        const htmls = this.songs.map((value,index) => {
            return `
            <div index='${index}' class="playlist_song ${index === this.currentIndex?'active':''}" >
                <div class="song_img" style="background-image:url(${value.image});">
                    
                </div>
                <div class="playlist_name">
                    ${value.name}
                </div>
                <div class="song_option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        }
        )
        
        $('.playlist').innerHTML = htmls.join('');
        
    },
    handleEvents:function(){
        const _this = this;
        const cdWidth = cd.offsetWidth ;
        
       
        //xử lý img thumb (quay tròn)
        var cdAnimate = cd.animate([
            {
                transform:"rotate(360deg)"
            },
            
        ],
        {
            duration:10000,
            iterations:Infinity       
        }
        )
        cdAnimate.pause();
        //xử lý khi scroll thì darhbround thu nhỏ
        document.onscroll = function(){
            const scrollTop = document.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth/cdWidth;
        }


        //xử lý khi click play
        toggleBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
                cdAnimate.pause()
            }else{
                audio.play();
                cdAnimate.play()
            }

            // khi song play
            audio.onplay = function(){
                toggleBtn.classList.add('play');
                _this.isPlaying = true;
            }

            //khi song pause
            audio.onpause = function(){
                toggleBtn.classList.remove('play');
                _this.isPlaying = false;
            }

            //khi tiến độ bài hát thay đổi
            
                
        }
        //xử lý khi next bài
        nextSong.onclick = function(){
            if(_this.randomMusic){
                _this.randomSong();
                
            }else{
                _this.nextSong();
            }
            
            _this.scrollActiveSong();
            audio.play()
            cdAnimate.play()
        }
        //xử lý khi prev bài
        prevSong.onclick = function(){
            if(_this.randomMusic){
                _this.randomSong();
            }else{
            _this.prevSong();
            }
            audio.play()
            cdAnimate.play()
        }
        
        //xử lý khi random bài
        randomSong.onclick = function(){
            _this.randomMusic =  _this.randomMusic?false:true;
            _this.setConfig('isRandom',_this.randomMusic)
            $('.control_random i').classList.toggle('active')
        }
        undoSong.onclick = function(){
            $('.control_undo i').classList.toggle('active')
            if(_this.undoMusic){
                _this.undoMusic = false;
                audio.loop = false
                
            }else{
                _this.undoMusic = true
                audio.loop = true;
            }
            _this.setConfig('isUndo', _this.undoMusic)
            

        }


        //xử lý khi hết bài
        var handleMusicEnd = function(){
            if(audio.currentTime == audio.duration){
                _this.currentIndex++;
                _this.loadCurrentSong();
                audio.play();
                cdAnimate.play()
                progress.value = 0;
            }
        }
        
        playlist.onclick = function(e){
           const songNode = e.target.closest('.playlist_song:not(.active)');
            
            if(songNode || e.target.closest('.song_option')){

                if(songNode){
                    _this.currentIndex = songNode.getAttribute('index');
                    

                    _this.loadCurrentSong();
                    _this.render();
                    audio.play()
                    cdAnimate.play()
                }
                if(e.target.closest('.song_option')){

                }
            }
            
        }

        //xử lý chạy progress
        progress.onchange = function(e){
           
            audio.currentTime = (e.target.value*audio.duration)/100;
            
        }

        audio.ontimeupdate = function(){
            console.log(1);
            var currentPercent = Math.floor((audio.currentTime/audio.duration)*100);
            // progress.setAttribute('value',`${currentPercent}`)
            progress.value = currentPercent;
            // console.log(audio.currentTime,currentPercent, progress.value)
            handleMusicEnd();
        }
        //xử lý khi kéo progress
        


    },
    loadConfig:function(){
       
        this.randomMusic = this.config.isRandom;
        this.undoMusic = this.config.isUndo;
     
        
        console.log()
        // Object.assign(this,thi.config)
    }
    ,
    nextSong : function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollActiveSongToTop();
    },
    prevSong : function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollActiveSongToTop();
        
    },
    randomSong:function(){ 
        var newIndex
        do {
            newIndex = Math.floor(Math.random()*(this.songs.length) + 0);
        } while(this.currentIndex === newIndex);

        this.currentIndex = newIndex;
        
        
        this.loadCurrentSong();
        this.render();
        this.scrollActiveSongToTop();

    },
    scrollActiveSongToTop:function(){
        setTimeout(function(){
            $('.active.playlist_song').scrollIntoView({
                behavior:"smooth",
                block:"end"
            })

        },500)
       
    },
    loadCurrentSong:function(){
        
        
        cdImg.style.backgroundImage = `url(${this.currentSong.image})`
        nameSong.textContent = this.currentSong.name;
        audio.src = this.currentSong.path;

    },
    
    start:function(){
        //gán cấu hình
        this.loadConfig();
        

        $('.control_random i').classList.toggle('active',this.randomMusic)
        $('.control_undo i').classList.toggle('active',this.undoMusic)
        
        this.defineProperties();
        //định nghĩa các phương thức mắc đinh(cho oject)

        this.render();
        //render playlist
     

        this.loadCurrentSong();

        this.handleEvents();
        //lắng nghe và xử lý

       
        
    }
}

app.start();
