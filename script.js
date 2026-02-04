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
    
    // Event Listeners for reading type selection
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
    
    // Get reading button
    getReadingButton.addEventListener('click', function() {
        if (!selectedReadingType) {
            alert('Please select a reading type first!');
            return;
        }
        
        generateReading();
    });
    
    // Reset button
    resetButton.addEventListener('click', function() {
        resetApp();
    });
    
    // New reading button
    newReadingButton.addEventListener('click', function() {
        resetApp();
    });
    
    // Save reading button
    saveReadingButton.addEventListener('click', function() {
        saveReading();
    });
    
    // Share reading button
    shareReadingButton.addEventListener('click', function() {
        shareReading();
    });
    
    // Function to select reading type
    function selectReadingType(type) {
        selectedReadingType = type;
        
        // Update UI to show selection
        readingOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.type === type) {
                option.classList.add('selected');
            }
        });
        
        selectButtons.forEach(button => {
            button.classList.remove('selected');
            if (button.dataset.type === type) {
                button.classList.add('selected');
                button.textContent = 'Selected';
            } else {
                button.textContent = 'Select Reading';
            }
        });
        
        // Update get reading button text
        getReadingButton.innerHTML = `<i class="fas fa-magic"></i> Get ${getReadingTypeName(type)} Reading`;
    }
    
    // Function to get reading type name
    function getReadingTypeName(type) {
        const names = {
            love: "Love & Relationships",
            career: "Career & Finances",
            future: "Future & Destiny",
            general: "General Guidance"
        };
        return names[type] || "Your";
    }
    
    // Function to generate a reading
    function generateReading() {
        // Show loading screen
        loadingSection.classList.remove('hidden');
        readingResult.classList.add('hidden');
        
        // Simulate AI processing time
        setTimeout(() => {
            // Generate random cards
            const readingCards = getRandomCards(3);
            
            // Generate AI interpretation
            const interpretation = generateInterpretation(readingCards, selectedReadingType);
            
            // Create reading object
            currentReading = {
                type: selectedReadingType,
                typeName: getReadingTypeName(selectedReadingType),
                cards: readingCards,
                interpretation: interpretation,
                question: customQuestion.value.trim(),
                date: new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                timestamp: new Date().toISOString()
            };
            
            // Display the reading
            displayReading(currentReading);
            
            // Hide loading, show result
            loadingSection.classList.add('hidden');
            readingResult.classList.remove('hidden');
            
            // Scroll to result
            readingResult.scrollIntoView({ behavior: 'smooth' });
        }, 2000); // 2 second delay to simulate processing
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
    
    // Function to generate AI interpretation
    function generateInterpretation(cards, type) {
        const templates = aiInterpretations[type] || aiInterpretations.general;
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // Create card summary
        const cardSummary = cards.map((card, index) => {
            const position = ["Past/Present", "Present", "Future"][index];
            return `${position}: ${card.name} (${card.orientation})`;
        }).join("\n");
        
        // Create personalized interpretation
        const questionText = customQuestion.value.trim() ? 
            `Your question: "${customQuestion.value.trim()}"\n\n` : '';
        
        return `${questionText}${template}\n\nCards Drawn:\n${cardSummary}\n\nReflect on how these energies might manifest in your life. The tarot offers guidance, but remember that you hold the power to shape your own destiny.`;
    }
    
    // Function to display reading
    function displayReading(reading) {
        // Set reading metadata
        readingTypeElement.textContent = reading.typeName;
        readingDateElement.textContent = reading.date;
        
        // Clear previous cards
        cardsContainer.innerHTML = '';
        
        // Display cards
        reading.cards.forEach((card, index) => {
            const cardElement = createCardElement(card, index);
            cardsContainer.appendChild(cardElement);
        });
        
        // Display interpretation
        interpretationText.textContent = reading.interpretation;
    }
    
    // Function to create card element
    function createCardElement(card, index) {
        const positions = ["Past/Present", "Present", "Future"];
        const position = positions[index] || "Card";
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card';
        cardDiv.dataset.index = index;
        
        const symbol = cardSymbols[card.suite] || cardSymbols.major;
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-symbol">${symbol}</div>
                    <div class="card-position">${position}</div>
                    <div class="card-tap">Tap to Reveal</div>
                </div>
                <div class="card-back">
                    <div class="card-name">${card.name}</div>
                    <div class="card-orientation ${card.reversed ? 'reversed' : 'upright'}">
                        ${card.orientation}
                    </div>
                    <div class="card-interpretation">${card.interpretationText.substring(0, 100)}...</div>
                    <div class="card-suite">${card.suite}</div>
                </div>
            </div>
        `;
        
        // Add click event to flip card
        cardDiv.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Auto-flip after a delay for presentation
        setTimeout(() => {
            cardDiv.classList.add('flipped');
        }, 500 + (index * 300));
        
        return cardDiv;
    }
    
    // Function to save reading
    function saveReading() {
        if (!currentReading) return;
        
        const readingData = {
            ...currentReading,
            savedAt: new Date().toISOString()
        };
        
        // In a real app, you would save to a backend
        // For this demo, we'll save to localStorage
        const savedReadings = JSON.parse(localStorage.getItem('tarotSavedReadings') || '[]');
        savedReadings.push(readingData);
        localStorage.setItem('tarotSavedReadings', JSON.stringify(savedReadings));
        
        // Show confirmation
        alert('Reading saved! You can access it later from your browser storage.');
    }
    
    // Function to share reading
    function shareReading() {
        if (!currentReading) return;
        
        // Create shareable text
        const shareText = `My Tarot Reading (${currentReading.typeName}):\n\n`;
        const cardsText = currentReading.cards.map(card => 
            `• ${card.name} (${card.orientation})`
        ).join('\n');
        
        const fullText = `${shareText}${cardsText}\n\n"${currentReading.interpretation.substring(0, 150)}..."\n\nGenerated with TarotAI`;
        
        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Tarot Reading',
                text: fullText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
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
            alert('Reading copied to clipboard! You can now paste it anywhere.');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy reading. Please try again.');
        });
    }
    
    // Function to reset the app
    function resetApp() {
        selectedReadingType = null;
        currentReading = null;
        
        // Reset UI
        readingOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        selectButtons.forEach(button => {
            button.classList.remove('selected');
            button.textContent = 'Select Reading';
        });
        
        customQuestion.value = '';
        loadingSection.classList.add('hidden');
        readingResult.classList.add('hidden');
        cardsContainer.innerHTML = '';
        
        // Reset get reading button
        getReadingButton.innerHTML = `<i class="fas fa-magic"></i> Get Your Reading`;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Initialize the app
    resetApp();
});