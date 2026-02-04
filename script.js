// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize application state
    let selectedReadingType = null;
    let currentReading = null;
    
    // DOM Elements
    const readingOptions = document.querySelectorAll('.option-card');
    const selectButtons = document.querySelectorAll('.select-btn');
    const getReadingButton = document.getElementById('get-reading');
    const resetButton = document.getElementById('reset-reading');
    const loadingSection = document.getElementById('loading-section');
    const readingResult = document.getElementById('reading-result');
    const customQuestion = document.getElementById('custom-question');
    const cardsContainer = document.getElementById('cards-container');
    const interpretationText = document.getElementById('interpretation-text');
    const readingTypeElement = document.getElementById('reading-type');
    const readingDateElement = document.getElementById('reading-date');
    const newReadingButton = document.getElementById('new-reading');
    const saveReadingButton = document.getElementById('save-reading');
    const shareReadingButton = document.getElementById('share-reading');
    
    // Gothic reading type names
    const gothicTypeNames = {
        love: "Heart's Shadow",
        career: "Path of Ambition", 
        future: "Veil of Fate",
        general: "Shadow Guidance"
    };
    
    // Gothic interpretations
    const gothicInterpretations = {
        love: [
            "The cards whisper of heart's mysteries untold. In the shadow of affection, truth awaits discovery. The path of love winds through darkness and light alike. What binds souls may also set them free.",
            "Veiled emotions stir in the chambers of the heart. The tarot reveals connections that transcend mere flesh and blood. Passion's fire burns bright, yet leaves ashes in its wake.",
            "Affection's shadow falls across your path. The cards speak of bonds that defy reason and challenges that test the spirit. In vulnerability lies true strength."
        ],
        career: [
            "Ambition's path winds through shadows of uncertainty. The cards reveal hidden opportunities and unseen obstacles. Your professional journey is marked by both triumph and trial.",
            "In the labyrinth of ambition, the tarot illuminates hidden passages. Success may come through unconventional means. Beware false allies who wear masks of friendship.",
            "The cards speak of power struggles and hard-won victories. Your career path is marked by both conquest and sacrifice. True mastery comes from embracing both shadow and light."
        ],
        future: [
            "The veil parts to reveal glimpses of destiny's design. The future is not fixed but shaped by choice and chance. What awaits is a tapestry woven from threads of possibility.",
            "Fate's shadows shift and dance. The tarot shows paths diverging in darkness. Your choices now echo through time's corridors. Nothing is inevitable save change itself.",
            "Beyond the curtain of the present, possibilities shimmer like stars in a moonless sky. The cards suggest transformation awaits - a metamorphosis of spirit or circumstance."
        ],
        general: [
            "The ancient ones speak through the cards' whispers. Shadows shift, revealing patterns in the darkness. Your journey is watched by unseen eyes.",
            "In the stillness between breaths, the tarot reveals its truths. The present moment holds echoes of the past and seeds of the future. All is interconnected.",
            "The cards cast light upon your shadowed path. Wisdom comes not from avoiding darkness, but from learning to see within it. The journey continues."
        ]
    };
    
    // Event Listeners
    readingOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.dataset.type;
            selectReadingType(type);
        });
    });
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const type = this.dataset.type;
            selectReadingType(type);
        });
    });
    
    getReadingButton.addEventListener('click', function() {
        if (!selectedReadingType) {
            showGothicAlert('Choose your path first, seeker.');
            return;
        }
        
        generateReading();
    });
    
    resetButton.addEventListener('click', function() {
        resetApp();
    });
    
    newReadingButton.addEventListener('click', function() {
        resetApp();
    });
    
    saveReadingButton.addEventListener('click', function() {
        saveReading();
    });
    
    shareReadingButton.addEventListener('click', function() {
        shareReading();
    });
    
    // Gothic alert function
    function showGothicAlert(message) {
        // Create a gothic-style alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'gothic-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button class="alert-close">×</button>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .gothic-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(145deg, var(--dark-gray), var(--black));
                border: 2px solid var(--blood-red);
                padding: 1.5rem;
                z-index: 1000;
                box-shadow: var(--glow);
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .alert-content {
                display: flex;
                align-items: center;
                gap: 15px;
                color: var(--white);
            }
            .alert-content i {
                color: var(--blood-red);
                font-size: 1.5rem;
            }
            .alert-content p {
                margin: 0;
                flex-grow: 1;
            }
            .alert-close {
                background: none;
                border: none;
                color: var(--silver);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            .alert-close:hover {
                color: var(--blood-red);
            }
        `;
        document.head.appendChild(style);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 5000);
        
        // Close button
        alertDiv.querySelector('.alert-close').addEventListener('click', () => {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        });
    }
    
    // Function to select reading type
    function selectReadingType(type) {
        selectedReadingType = type;
        
        // Update UI to show selection
        readingOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.type === type) {
                option.classList.add('selected');
                // Add a subtle glow effect
                option.style.boxShadow = '0 0 20px rgba(139, 0, 0, 0.7)';
            } else {
                option.style.boxShadow = '';
            }
        });
        
        selectButtons.forEach(button => {
            button.classList.remove('selected');
            if (button.dataset.type === type) {
                button.classList.add('selected');
                button.innerHTML = `<i class="fas fa-check"></i> Path Chosen`;
            } else {
                button.innerHTML = `Select Path`;
            }
        });
        
        // Update get reading button text
        getReadingButton.innerHTML = `<i class="fas fa-skull-crossbones"></i> Cast the ${gothicTypeNames[type]} Cards`;
    }
    
    // Function to generate a reading
    function generateReading() {
        // Show loading screen
        loadingSection.classList.remove('hidden');
        readingResult.classList.add('hidden');
        
        // Add some atmosphere
        playAmbientSound();
        
        // Simulate ritual time
        setTimeout(() => {
            // Generate random cards
            const readingCards = getRandomCards(3);
            
            // Generate gothic interpretation
            const interpretation = generateGothicInterpretation(readingCards, selectedReadingType);
            
            // Create reading object
            currentReading = {
                type: selectedReadingType,
                typeName: gothicTypeNames[selectedReadingType],
                cards: readingCards,
                interpretation: interpretation,
                question: customQuestion.value.trim(),
                date: getGothicDate(),
                timestamp: new Date().toISOString()
            };
            
            // Display the reading
            displayReading(currentReading);
            
            // Hide loading, show result
            loadingSection.classList.add('hidden');
            readingResult.classList.remove('hidden');
            
            // Add dramatic entrance effect
            readingResult.style.opacity = '0';
            readingResult.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                readingResult.style.transition = 'all 1s ease';
                readingResult.style.opacity = '1';
                readingResult.style.transform = 'translateY(0)';
            }, 100);
            
            // Scroll to result
            readingResult.scrollIntoView({ behavior: 'smooth' });
            
            // Stop ambient sound
            stopAmbientSound();
        }, 3000); // 3 second ritual time
    }
    
    // Function to get gothic date
    function getGothicDate() {
        const now = new Date();
        const days = ['Shadowday', 'Bloodmoon', 'Crowday', 'Veilday', 'Soulmoon', 'Graveday', 'Duskday'];
        const months = ['Nightfrost', 'Bloodmoon', 'Shadowveil', 'Gravebloom', 'Deathshroud', 'Soulfire', 'Crowcall', 'Duskfall', 'Boneshard', 'Ghostwind', 'Cryptice', 'Endnight'];
        
        return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
    
    // Function to play ambient sound (simulated)
    function playAmbientSound() {
        // In a real app, you would play audio
        // For now, we'll just add a visual effect
        const candles = document.querySelectorAll('.candle');
        candles.forEach(candle => {
            const flame = candle.querySelector('::before');
            if (flame) {
                candle.style.animation = 'flicker 0.5s infinite alternate';
            }
        });
    }
    
    // Function to stop ambient sound
    function stopAmbientSound() {
        const candles = document.querySelectorAll('.candle');
        candles.forEach(candle => {
            candle.style.animation = '';
        });
    }
    
    // Function to get random cards
    function getRandomCards(count) {
        const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        
        // Determine orientation (upright or reversed) for each card
        return selected.map(card => {
            const isReversed = Math.random() > 0.5;
            return {
                ...card,
                reversed: isReversed,
                orientation: isReversed ? "Reversed" : "Upright",
                interpretationText: isReversed ? 
                    card.interpretation.split("Reversed:")[1] || card.interpretation :
                    card.interpretation.split("Reversed:")[0]
            };
        });
    }
    
    // Function to generate gothic interpretation
    function generateGothicInterpretation(cards, type) {
        const templates = gothicInterpretations[type] || gothicInterpretations.general;
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // Create card summary
        const positions = ["PAST/SHADOW", "PRESENT/VOID", "FUTURE/ECHO"];
        const cardSummary = cards.map((card, index) => {
            const position = positions[index];
            return `✦ ${position}: ${card.name} (${card.orientation})`;
        }).join('\n');
        
        // Create personalized interpretation
        const questionText = customQuestion.value.trim() ? 
            `Your whispered question: "${customQuestion.value.trim()}"\n\n` : '';
        
        return `${questionText}${template}\n\n✧ CARDS REVEALED ✧\n${cardSummary}\n\nRemember, seeker: The cards show possibilities, not certainties. The true power lies in how you walk your shadowed path.`;
    }
    
    // Function to display reading
    function displayReading(reading) {
        // Set reading metadata
        readingTypeElement.textContent = reading.typeName;
        readingDateElement.textContent = reading.date;
        
        // Clear previous cards
        cardsContainer.innerHTML = '';
        
        // Display cards with dramatic reveal
        reading.cards.forEach((card, index) => {
            setTimeout(() => {
                const cardElement = createGothicCardElement(card, index);
                cardsContainer.appendChild(cardElement);
                
                // Add a subtle glow effect
                setTimeout(() => {
                    cardElement.style.boxShadow = '0 0 15px rgba(139, 0, 0, 0.5)';
                    setTimeout(() => {
                        cardElement.style.boxShadow = '';
                    }, 1000);
                }, 300);
            }, index * 500);
        });
        
        // Display interpretation
        interpretationText.textContent = reading.interpretation;
    }
    
    // Function to create gothic card element
    function createGothicCardElement(card, index) {
        const positions = ["PAST/SHADOW", "PRESENT/VOID", "FUTURE/ECHO"];
        const position = positions[index] || "MYSTERY";
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card';
        cardDiv.dataset.index = index;
        
        // Get appropriate symbol
        let symbol = "★";
        if (card.suite === "Wands") symbol = "🜂";
        else if (card.suite === "Cups") symbol = "🜁";
        else if (card.suite === "Swords") symbol = "🜄";
        else if (card.suite === "Pentacles") symbol = "🜃";
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-symbol">${symbol}</div>
                    <div class="card-position">${position}</div>
                    <div class="card-tap">Touch to unveil</div>
                </div>
                <div class="card-back">
                    <div class="card-name">${card.name.toUpperCase()}</div>
                    <div class="card-orientation ${card.reversed ? 'reversed' : 'upright'}">
                        ${card.orientation}
                    </div>
                    <div class="card-interpretation">${card.interpretationText.substring(0, 80)}...</div>
                    <div class="card-suite">${card.suite.toUpperCase()}</div>
                </div>
            </div>
        `;
        
        // Add click event to flip card
        cardDiv.addEventListener('click', function() {
            this.classList.toggle('flipped');
            // Add sound effect (in a real app)
            if (this.classList.contains('flipped')) {
                this.style.boxShadow = '0 0 20px rgba(139, 0, 0, 0.7)';
            } else {
                this.style.boxShadow = '';
            }
        });
        
        // Auto-flip after a delay for dramatic effect
        setTimeout(() => {
            cardDiv.classList.add('flipped');
        }, 1000 + (index * 600));
        
        return cardDiv;
    }
    
    // Function to save reading
    function saveReading() {
        if (!currentReading) return;
        
        const readingData = {
            ...currentReading,
            savedAt: new Date().toISOString()
        };
        
        // Save to localStorage
        const savedReadings = JSON.parse(localStorage.getItem('tarotGothicReadings') || '[]');
        savedReadings.push(readingData);
        localStorage.setItem('tarotGothicReadings', JSON.stringify(savedReadings));
        
        // Show gothic confirmation
        showGothicAlert('Reading preserved in the eternal archives.');
        
        // Visual feedback
        saveReadingButton.innerHTML = `<i class="fas fa-check"></i> Preserved`;
        setTimeout(() => {
            saveReadingButton.innerHTML = `<i class="fas fa-tombstone"></i> Preserve Reading`;
        }, 2000);
    }
    
    // Function to share reading
    function shareReading() {
        if (!currentReading) return;
        
        // Create gothic shareable text
        const shareText = `✧ TAROT DIVINATION ✧\n${currentReading.typeName}\n\n`;
        const cardsText = currentReading.cards.map(card => 
            `✦ ${card.name} (${card.orientation})`
        ).join('\n');
        
        const fullText = `${shareText}${cardsText}\n\n"${currentReading.interpretation.substring(0, 120)}..."\n\n— Generated in the shadowed chambers of TarotAI —`;
        
        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Tarot Divination',
                text: fullText,
                url: window.location.href
            }).catch(err => {
                console.log('Sharing failed:', err);
                copyToClipboard(fullText);
            });
        } else {
            // Fallback to clipboard
            copyToClipboard(fullText);
        }
    }
    
    // Function to copy text to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showGothicAlert('Reading copied to the void. Share wisely.');
            
            // Visual feedback
            shareReadingButton.innerHTML = `<i class="fas fa-check"></i> Copied`;
            setTimeout(() => {
                shareReadingButton.innerHTML = `<i class="fas fa-ghost"></i> Share with Shadows`;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showGothicAlert('The shadows resist... try again.');
        });
    }
    
    // Function to reset the app
    function resetApp() {
        selectedReadingType = null;
        currentReading = null;
        
        // Reset UI
        readingOptions.forEach(option => {
            option.classList.remove('selected');
            option.style.boxShadow = '';
        });
        
        selectButtons.forEach(button => {
            button.classList.remove('selected');
            button.innerHTML = `Select Path`;
        });
        
        customQuestion.value = '';
        loadingSection.classList.add('hidden');
        readingResult.classList.add('hidden');
        cardsContainer.innerHTML = '';
        
        // Reset get reading button
        getReadingButton.innerHTML = `<i class="fas fa-skull-crossbones"></i> Cast the Cards`;
        
        // Scroll to top with smooth animation
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show reset message
        showGothicAlert('The circle is cleared. The shadows await new questions.');
    }
    
    // Initialize the app
    resetApp();
});