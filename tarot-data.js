// Tarot card data - same as your Tarot.json file
const tarotDeck = [
    {
        "name": "The Fool",
        "suite": "major",
        "image": "deck/RWS_Tarot_00_Fool.jpg",
        "description": "With light step, as if earth and its trammels had little power to restrain him, a young man in gorgeous vestments pauses at the brink of a precipice among the great heights of the world; he surveys the blue distance before him-its expanse of sky rather than the prospect below. His act of eager walking is still indicated, though he is stationary at the given moment; his dog is still bounding. The edge which opens on the depth has no terror; it is as if angels were waiting to uphold him, if it came about that he leaped from the height. His countenance is full of intelligence and expectant dream. He has a rose in one hand and in the other a costly wand, from which depends over his right shoulder a wallet curiously embroidered. He is a prince of the other world on his travels through this one-all amidst the morning glory, in the keen air. The sun, which shines behind him, knows whence he came, whither he is going, and how he will return by another path after many days. He is the spirit in search of experience. Many symbols of the Instituted Mysteries are summarized in this card, which reverses, under high warrants, all the confusions that have preceded it. In his Manual of Cartomancy, Grand Orient has a curious suggestion of the office of Mystic Fool, as apart of his process in higher divination; but it might call for more than ordinary gifts to put it into operation. We shall see how the card fares according to the common arts of fortune-telling, and it will be an example, to those who can discern, of the fact, otherwise so evident, that the Trumps Major had no place originally in the arts of psychic gambling, when cards are used as the counters and pretexts. Of the circumstances under which this art arose we know, however, very little. The conventional explanations say that the Fool signifies the flesh, the sensitive life, and by a peculiar satire its subsidiary name was at one time the alchemist, as depicting folly at the most insensate stage.",
        "interpretation": "Folly, mania, extravagance, intoxication, delirium, frenzy, bewrayment. Reversed: Negligence, absence, distribution, carelessness, apathy, nullity, vanity."
    },
    // ... (Include all other tarot cards from your JSON file)
    // For brevity, I'm including a few cards. You should copy all cards from your JSON file here.
    {
        "name": "The Magician",
        "suite": "major",
        "image": "deck/RWS_Tarot_01_Magician.jpg",
        "description": "A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes. Above his head is the mysterious sign of the Holy Spirit, the sign of life, like an endless cord, forming the figure 8 in a horizontal position . About his waist is a serpent-cincture, the serpent appearing to devour its own tail. This is familiar to most as a conventional symbol of eternity, but here it indicates more especially the eternity of attainment in the spirit. In the Magician's right hand is a wand raised towards heaven, while the left hand is pointing to the earth. This dual sign is known in very high grades of the Instituted Mysteries; it shews the descent of grace, virtue and light, drawn from things above and derived to things below. The suggestion throughout is therefore the possession and communication of the Powers and Gifts of the Spirit. On the table in front of the Magician are the symbols of the four Tarot suits, signifying the elements of natural life, which lie like counters before the adept, and he adapts them as he wills. Beneath are roses and lilies, the flos campi and lilium convallium, changed into garden flowers, to shew the culture of aspiration. This card signifies the divine motive in man, reflecting God, the will in the liberation of its union with that which is above. It is also the unity of individual being on all planes, and in a very high sense it is thought, in the fixation thereof. With further reference to what I have called the sign of life and its connexion with the number 8, it may be remembered that Christian Gnosticism speaks of rebirth in Christ as a change 'unto the Ogdoad.' The mystic number is termed Jerusalem above, the Land flowing with Milk and Honey, the Holy Spirit and the Land of the Lord. According to Martinism, 8 is the number of Christ.",
        "interpretation": "Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male. Reversed: Physician, Magus, mental disease, disgrace, disquiet."
    },
    {
        "name": "High Priestess",
        "suite": "major",
        "image": "deck/RWS_Tarot_02_High_Priestess.jpg",
        "description": "She has the lunar crescent at her feet, a horned diadem on her head, with a globe in the middle place, and a large solar cross on her breast. The scroll in her hands is inscribed with the word Tora, signifying the Greater Law, the Secret Law and the second sense of the Word. It is partly covered by her mantle, to shew that some things are implied and some spoken. She is seated between the white and black pillars--J. and B.--of the mystic Temple, and the veil of the Temple is behind her: it is embroidered with palms and pomegranates. The vestments are flowing and gauzy, and the mantle suggests light--a shimmering radiance. She has been called occult Science on the threshold of the Sanctuary of Isis, but she is really the Secret Church, the House which is of God and man. She represents also the Second Marriage of the Prince who is no longer of this world; she is the spiritual Bride and Mother, the daughter of the stars and the Higher Garden of Eden. She is, in fine, the Queen of the borrowed light, but this is the light of all. She is the Moon nourished by the milk of the Supernal Mother. In a manner, she is also the Supernal Mother herself--that is to say, she is the bright reflection. It is in this sense of reflection that her truest and highest name in bolism is Shekinah--the co-habiting glory. According to Kabalism, there is a Shekinah both above and below. In the superior world it is called Binah, the Supernal Understanding which reflects to the emanations that are beneath. In the lower world it is MaIkuth--that world being, for this purpose, understood as a blessed Kingdom that with which it is made blessed being the Indwelling Glory. Mystically speaking, the Shekinah is the Spiritual Bride of the just man, and when he reads the Law she gives the Divine meaning. There are some respects in which this card is the highest and holiest of the Greater Arcana.",
        "interpretation": "Secrets, mystery, the future as yet unrevealed; the woman who interests the Querent, if male; the Querent herself, if female; silence, tenacity; mystery, wisdom, science. Reversed: Passion, moral or physical ardour, conceit, surface knowledge."
    }
    // ... Continue with all other cards from your JSON file
];

// AI interpretation templates for different reading types
const aiInterpretations = {
    love: [
        "Your love reading reveals a journey of emotional discovery. The cards suggest you are on the path to understanding deeper connections. In matters of the heart, balance and communication are key. The universe is aligning to bring meaningful relationships into your life. Remember that true love often begins with self-love and acceptance.",
        "The cards speak of romantic potential and emotional growth. You may be encountering situations that test your vulnerability, but these are opportunities for genuine connection. Trust your intuition when it comes to matters of the heart, and be open to unexpected possibilities.",
        "Your relationship path is being illuminated. The tarot indicates that emotional honesty will lead to fulfilling connections. Whether you're seeking new love or nurturing an existing relationship, the energy around you supports meaningful emotional exchanges."
    ],
    career: [
        "Your career reading indicates a period of professional development and opportunity. The cards suggest that your skills and talents are being recognized. This is a favorable time for taking calculated risks and pursuing advancement. Networking and collaboration will prove especially fruitful in the coming period.",
        "Professional growth and financial stability are highlighted in your reading. You may be at a crossroads where important decisions about your career path need to be made. Trust your expertise while remaining open to new learning opportunities that could expand your professional horizons.",
        "The tarot reveals a strong work ethic and potential for success in your chosen field. Consider how you can align your career with your personal values for greater fulfillment. Opportunities for advancement may come through unexpected channels, so remain attentive."
    ],
    future: [
        "Your future reading suggests a period of transformation and new beginnings. The cards indicate that you are moving toward a more authentic expression of yourself. While change can be challenging, it leads to personal growth and fulfillment. The universe is conspiring to bring positive developments into your life.",
        "The path ahead is illuminated with possibilities for personal evolution. You may find yourself shedding old patterns to make way for new experiences. Trust that the journey, with all its twists and turns, is leading you toward your highest good.",
        "Your destiny is unfolding in alignment with your deepest aspirations. The tarot indicates that synchronicities and meaningful coincidences will guide your way forward. Remain open to signs and intuitive nudges as you navigate the road ahead."
    ],
    general: [
        "Your general reading reveals a balanced perspective on your current life situation. The cards suggest that you have the inner resources needed to navigate challenges and embrace opportunities. This is a time for reflection and conscious decision-making.",
        "The tarot indicates a period of integration and harmony. You may be finding balance between different aspects of your life. Trust in your ability to adapt and grow through whatever circumstances arise.",
        "Your spiritual and practical paths are converging in meaningful ways. The cards suggest that paying attention to both inner guidance and external realities will serve you well. Life is presenting opportunities for both learning and enjoyment."
    ]
};

// Symbol mapping for card display
const cardSymbols = {
    "major": "★",
    "Wands": "🜂",
    "Cups": "🜁",
    "Swords": "🜄",
    "Pentacles": "🜃"
};