(function(){
    function SongPlayer(){
        
        /**
 +       *@desc empty SongPlayer object
 +       *@type {Object}
 +       */
        
        var SongPlayer = {};
        
        /**
 +        *@desc current song
 +        *@type {Object}
 +        */
        
        var currentSong = null;
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */

        var currentBuzzObject = null;
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        
        var setSong = function(song){
            if(currentBuzzObject){
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }
            
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
            
                currentSong = song; 
        };
        
        /**
 +       *@function playSong
 +       *@desc Plays current audio file and sets song.playing to true
 +       *@param {Object} song
 +       */
        
        var playSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.play();
                song.playing = true;
            }
        };
        
        /**
 +       *@function SongPlayer.play method
 +       *@desc Checks if current song playing equals the selected song, if not then it sets the current song to the selected song and plays this song.  If current song is the same as the selected song, checks to see if audo file is paused.  If so, it plays selected song.
 +       *@param {Object} song
 +       */
        
        SongPlayer.play = function(song){
            
            if(currentSong !== song){
                setSong(song);
                playSong(song);
            } else if(currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }    
        };
        
        /**
 +       *@function SongPlayer.pause method
 +       *@desc Pauses current audio file and sets song.playing to false
 +       *@param {Object} song
 +       */
        
        SongPlayer.pause = function(song){
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();