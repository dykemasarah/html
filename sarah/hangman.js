/**
* Hangman Javascript class
* Author: @jelofsson
**/
var Hangman = (function () {
    
    'use strict';
               
    function Hangman(elId) {
        
        // Dom is ready
        this.elId       = elId;
        this.words      = ['SO LONG', 'FAREWELL', 'TWO WEEKS', 'THIS IS MY NOTICE', 'GOODBYE HOMEAWAY'];
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
                this.showElementByIdWithContent(this.elId + "_end", "<b>Sarah's last day will be Jan 17, 2018.</br></b></br><i><font color=\"red\"; size=\"3\";><b>INCORRECT</b>, The Phrase Was: \"" + this.WORD + "\"</font></i>");
                document.getElementById("countdown").style.opacity = "1";
                this.STOPPED = true;
                return;
            }
            
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            document.getElementById("countdown").style.opacity = "1";
            this.showElementByIdWithContent(this.elId + "_end", "<b>Sarah's last day will be Jan 17, 2018.</br></b></br><i><font color=\"green\"; size=\"3\";><b>Correct</b>, The Phrase Was: \"" + this.WORD + "\"</font></i>");
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
