(function(){
    function SongPlayer($rootScope, Fixtures){
        
        /**
          *@desc empty SongPlayer object
          *@type {Object}
          */
        
        var SongPlayer = {};
        
        /**
          *@desc get album information
          *@type {object} album
          */
        
        var currentAlbum = Fixtures.getAlbum();
        
        /**
          * @desc Buzz object audio file
          * @type {Object}
          */

        var currentBuzzObject = null;
        
        /**
          *@desc current song
          *@type {Object}
          */
        
        
        SongPlayer.currentSong = null;
        
        /**
          *@desc Current playback time (in seconds) of currently playing song
          *@type {number}
          */
        
        SongPlayer.currentTime = null;
        
        /**
          *@desc Setting initial volume for songPlayer
          *@type {number}
          */
        
        SongPlayer.volume = 60;
        
        /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
        
        var setSong = function(song){
            if(currentBuzzObject){
                    currentBuzzObject.stop();
                    SongPlayer.currentSong.playing = null;
                }
            
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
            
                currentBuzzObject.bind('timeupdate', function(){
                    $rootScope.$apply(function(){
                        SongPlayer.currentTime = currentBuzzObject.getTime();
                    });
                });
            
                SongPlayer.currentSong = song; 
        };
        
         /**
           *@function getSongIndex
           *@desc get the index of a song from the album array
           *@type [array] index
           */
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
          *@function playSong
          *@desc Plays current audio file and sets song.playing to true
          *@param {Object} song
          */
        
        var playSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.play();
                song.playing = true;
            }
        };
        
        /**
          *@function stopSong
          *@desc stops current audio ifle and sets song.playing to null
          *@param {Object} song
          */
        
        var stopSong = function(song){
            if(currentBuzzObject){
               currentBuzzObject.stop();
                song.playing = null;
               }
        };
        
        /**
          *@function SongPlayer.play method
          *@desc Checks if current song playing equals the selected song, if not then it sets the current song to the selected song and plays this song.  If current song is the same as the selected song, checks to see if audo file is paused.  If so, it plays selected song.
          *@param {Object} song
          */
        
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if(SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }    
        };
        
        /**
          *@function SongPlayer.pause method
          *@desc Pauses current audio file and sets song.playing to false
          *@param {Object} song
          */
        
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
          *@function SongPlayer.previous method
          *@desc Stops currently playing song and sets the value of currently playing song to the previous song in the array
          *@param {Object} song
          */
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if(currentSongIndex < 0){
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song)
            }
        };
        
        /**
          *@function SongPlayer.next method
          *@desc Stops the currently playing song and set the value of the currently playing song to the next song in the array
          *@param {Object} song
          */
        
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if(currentSongIndex > currentAlbum.songs.length - 1){
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
          *@function setCurrentTime
          *@desc Set current time (in seconds) of currently playing song
          *@param {number} time
          */
        
        SongPlayer.setCurrentTime = function(time){
            if(currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
          *@function setVolume
          *@desc sets volume in the songPlayer
          *@param {volume}
          */
        
        SongPlayer.setVolume = function(volume){
            if(currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();