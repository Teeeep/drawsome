
const words = [
    "cat", "ghost", "cow", "bug", "snake", 
    "lips", "socks", "coat", "heart", "kite", "milk", 
    "skateboard", "apple", "mouse", "star", "whale", 
    "hippo", "face", "ice cream connect", "spoon", 
    "sun", "flower", "banana", "book", "light", "apple", 
    "smile", "shoe", "hat", "dog", "duck", "bird", "person", 
    "ball", "nose", "jacket", "beach", "cookie", "drum", 
    "worm", "cup", "pie", "snowflake", "jar", "tree", 
    "slide", "swing", "water", "ocean", "mouth", "eyes", 
    "boy", "girl", "house", "bed", "house", "bed", "shirt", 
    "egg", "cheese", "circle", "spider web"]

function selectWord () {
    const randomNumber = Math.floor(Math.random() * words.length)
    const word = words[randomNumber]
    return word
}

function selectMultipleWords () {
    const random = Math.floor(Math.random() * words.length)
}


//console.log(selectWord())

//const additions = ["happy", "sad", "angry", "flabbergasted", 
//"confused", "shocked", "traumatized", "scared", "frightened", 
//"disgusted", "calm", "jealous", "weeping"  ]    

