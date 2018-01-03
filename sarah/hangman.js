/**
* Farewell My Friends
* Author: Sarah Dykema Hampton
*
* To my team: I will miss you the most. <3
* Everyone else: It's been a good run.
*  
*                     o           o 
*                        o   o    
*                           o         o
*  
*                       o       o  o 
*                    ________._____________
*                    |   .                |
*                    |^^^.^^^^^.^^^^^^.^^^|
*                    |     .   .   .      |
*                     \      . . . .     /
*  C H E E R S !!!      \     .  .     / 
*                         \    ..    / 
*                           \      /
*                             \  /
*                              \/
*                              ||
*                              ||
*                              ||
*                              ||
*                              ||
*                              /\
*                             /;;\
*                        ==============
*
*
* Peace,
* Sarah
*
**/

console.log("If you are trying to reverse engineer my code, don't worry, there is nothing malicious...")

// hehe
new Audio('http://www.soundboard.com/mediafiles/10/101443-244c91f7-5a53-471c-8a0f-8ffa9f316071.mp3').play()

var Hangman = (function () {
    
    'use strict';
               
    function Hangman(elId) {
        
        // Dom is ready
        this.elId       = elId;
        this.words      = ['SO LONG', 'FAREWELL FRIENDS', 'BEST OF LUCK', 'OH CRAP', 'TWO WEEKS', 'TIME TO GET GOING'];
    }

    Hangman.prototype.reset = function () {
        
        // Reset variables
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        this.WORD           = this.words[Math.floor(Math.random() * this.words.length)];
        
        // Reset Elements
        this.hideElementByClass('h');
        this.foc
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        document.getElementById("guess").focus();
        this.showElementByIdWithContent(this.elId + "_foundataion_b", null);
        this.showElementByIdWithContent(this.elId + "_foundataion_v", null);
        this.showElementByIdWithContent(this.elId + "_foundataion_h", null);
        this.showElementByIdWithContent(this.elId + "_foundataion_r", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
	gtag('event', 'event_name', {'event_category': 'new game', 'event_label': 'click'});
    };

    Hangman.prototype.guess = function (guess) {

        // Uppercase the guessed letter
        guess = guess.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(guess) > -1) {
            // Game stopped or allready guessed on that letter
            return;
        }

        // Add the letter to array GUESSES
        this.GUESSES.push(guess);
        // Update the word hint
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        // Update the guessed letter list
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(guess) < 0) {
            
            // Incorrect guess
            this.MISTAKES++;
            
            // Show next part of hangman character
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);

            if (this.MISTAKES === 9) {
                // Game Over
                this.showElementByIdWithContent(this.elId + "_end", "<b>Sarah's last day will be Jan 17, 2018.</br></b><i><font color=\"red\"; size=\"3\";><b>Incorrect</b>, the phrase was: \"" + this.WORD + "\"</font></i>");
                document.getElementById("countdown").style.opacity = "1";
		gtag('event', 'event_name', {'event_category': 'game_failed', 'event_label': 'failed game'});
                this.STOPPED = true;
                return;
            }
            
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            document.getElementById("countdown").style.opacity = "1";
            this.showElementByIdWithContent(this.elId + "_end", "<b>Sarah's last day will be Jan 17, 2018.</br></b><i><font color=\"green\"; size=\"3\";><b>Correct</b>, the phrase was: \"" + this.WORD + "\"</font></i>");
	    gtag('event', 'event_name', {'event_category': 'game_passed', 'event_label': 'successful game'});
            this.STOPPED = true;
            return;
        }

    };
    
    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };
    
    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            if (this.WORD[i] == ' '){
                result += ' ';
            }
            else{
                result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                        this.WORD[i] : "_";
            }
        }
        return result;
    };
    
    return new Hangman('hangm');
    
}());
