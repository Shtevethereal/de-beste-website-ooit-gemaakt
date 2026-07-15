export interface Phoneme { symbol: string; spelling: string; example: string }
export interface ConsonantGroup { name: string; description: string; sounds: Phoneme[] }

export const vowels: Array<Phoneme & { position: string }> = [
  { symbol: 'i', spelling: 'i', example: 'machine', position: 'Close front' },
  { symbol: 'y', spelling: 'ü', example: 'French tu', position: 'Close front rounded' },
  { symbol: 'ɪ', spelling: 'i', example: 'bid', position: 'Near-close front' },
  { symbol: 'e', spelling: 'e', example: 'café', position: 'Close-mid front' },
  { symbol: 'ø', spelling: 'ö', example: 'French deux', position: 'Close-mid front rounded' },
  { symbol: 'ɛ', spelling: 'e', example: 'bed', position: 'Open-mid front' },
  { symbol: 'œ', spelling: 'œ', example: 'French sœur', position: 'Open-mid front rounded' },
  { symbol: 'æ', spelling: 'ä', example: 'cat', position: 'Near-open front' },
  { symbol: 'a', spelling: 'a', example: 'father', position: 'Open front' },
  { symbol: 'ə', spelling: 'a', example: 'about', position: 'Central' },
  { symbol: 'ɨ', spelling: 'y', example: 'Polish ryba', position: 'Close central' },
  { symbol: 'ɐ', spelling: 'ă', example: 'the end of comma', position: 'Near-open central' },
  { symbol: 'u', spelling: 'u', example: 'goose', position: 'Close back' },
  { symbol: 'ɯ', spelling: 'ı', example: 'Turkish ılık', position: 'Close back unrounded' },
  { symbol: 'ʊ', spelling: 'u', example: 'book', position: 'Near-close back' },
  { symbol: 'o', spelling: 'o', example: 'go', position: 'Close-mid back' },
  { symbol: 'ɤ', spelling: 'â', example: 'a back, unrounded o', position: 'Close-mid back unrounded' },
  { symbol: 'ɔ', spelling: 'o', example: 'thought', position: 'Open-mid back' },
  { symbol: 'ɑ', spelling: 'a', example: 'palm', position: 'Open back' },
  { symbol: 'ɒ', spelling: 'å', example: 'British lot', position: 'Open back rounded' },
]

export const consonantGroups: ConsonantGroup[] = [
  { name: 'Bilabial', description: 'Made by bringing both lips together.', sounds: [
    { symbol: 'p', spelling: 'p', example: 'spin; voiceless plosive' }, { symbol: 'b', spelling: 'b', example: 'bin; voiced plosive' }, { symbol: 'm', spelling: 'm', example: 'moon; nasal' },
  ]},
  { name: 'Labiodental', description: 'Lower lip touches the upper teeth.', sounds: [
    { symbol: 'f', spelling: 'f', example: 'fine; voiceless fricative' }, { symbol: 'v', spelling: 'v', example: 'vine; voiced fricative' },
  ]},
  { name: 'Dental & alveolar', description: 'Tongue meets the teeth or the ridge just behind them.', sounds: [
    { symbol: 'θ', spelling: 'th', example: 'thin; voiceless' }, { symbol: 'ð', spelling: 'dh', example: 'this; voiced' }, { symbol: 't', spelling: 't', example: 'top; plosive' },
    { symbol: 'd', spelling: 'd', example: 'dog; voiced plosive' }, { symbol: 's', spelling: 's', example: 'sip; fricative' }, { symbol: 'z', spelling: 'z', example: 'zip; voiced fricative' }, { symbol: 'n', spelling: 'n', example: 'no; nasal' }, { symbol: 'l', spelling: 'l', example: 'low; lateral' }, { symbol: 'r', spelling: 'r', example: 'rolled r' },
  ]},
  { name: 'Postalveolar & palatal', description: 'Tongue rises toward the hard roof of the mouth.', sounds: [
    { symbol: 'ʃ', spelling: 'sh', example: 'ship; voiceless' }, { symbol: 'ʒ', spelling: 'zh', example: 'vision; voiced' }, { symbol: 'tʃ', spelling: 'ch', example: 'chip; affricate' }, { symbol: 'j', spelling: 'y', example: 'yes; glide' },
  ]},
  { name: 'Retroflex', description: 'The tongue tip curls slightly backward toward the roof of the mouth.', sounds: [
    { symbol: 'ʈ', spelling: 'ṭ', example: 'a curled-back t' }, { symbol: 'ɖ', spelling: 'ḍ', example: 'a voiced curled-back d' },
    { symbol: 'ɳ', spelling: 'ṇ', example: 'a curled-back n' }, { symbol: 'ɭ', spelling: 'ḷ', example: 'a curled-back l' }, { symbol: 'ʂ', spelling: 'ṣ', example: 'a curled-back sh' },
  ]},
  { name: 'Velar & uvular', description: 'Back of the tongue approaches the soft palate or uvula.', sounds: [
    { symbol: 'k', spelling: 'k', example: 'cat; voiceless plosive' }, { symbol: 'g', spelling: 'g', example: 'go; voiced plosive' }, { symbol: 'ŋ', spelling: 'ng', example: 'sing; nasal' }, { symbol: 'x', spelling: 'kh', example: 'Scottish loch' }, { symbol: 'q', spelling: 'q', example: 'a deep k sound' },
  ]},
  { name: 'Glottal', description: 'Made down in the throat, at the vocal folds.', sounds: [
    { symbol: 'h', spelling: 'h', example: 'hat; breathy fricative' }, { symbol: 'ʔ', spelling: "'", example: 'the break in uh-oh' },
  ]},
  { name: 'Lateral fricatives', description: 'Air hisses around one or both sides of the tongue.', sounds: [
    { symbol: 'ɬ', spelling: 'lh', example: 'Welsh ll; voiceless' }, { symbol: 'ɮ', spelling: 'lz', example: 'a voiced, buzzing ll' },
  ]},
  { name: 'Ejectives', description: 'A sharp popping sound made by trapping and pushing air upward in the throat.', sounds: [
    { symbol: 'pʼ', spelling: "p'", example: 'a popping p' }, { symbol: 'tʼ', spelling: "t'", example: 'a popping t' },
    { symbol: 'kʼ', spelling: "k'", example: 'a popping k' }, { symbol: 'qʼ', spelling: "q'", example: 'a deep popping q' },
  ]},
  { name: 'Pharyngeal', description: 'The throat narrows deep behind the tongue. Common in Arabic and related languages.', sounds: [
    { symbol: 'ħ', spelling: 'hh', example: 'a strong, whispered h' }, { symbol: 'ʕ', spelling: '3', example: 'a deep, voiced throat sound' },
  ]},
  { name: 'Clicks', description: 'The tongue traps and releases air with a pop, without breathing it out from the lungs.', sounds: [
    { symbol: 'ʘ', spelling: 'pw', example: 'a lip-smacking click' }, { symbol: 'ǀ', spelling: 'tc', example: 'a dental “tsk” click' },
    { symbol: 'ǃ', spelling: 'qc', example: 'a sharp tongue-pop click' }, { symbol: 'ǁ', spelling: 'lc', example: 'a click at the side of the tongue' },
  ]},
]

export const spellingFor = (symbol: string) =>
  [...vowels, ...consonantGroups.flatMap((group) => group.sounds)].find((sound) => sound.symbol === symbol)?.spelling ?? symbol
