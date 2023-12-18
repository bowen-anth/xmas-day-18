/** OpenAI setup **/
// import OpenAI from "openai"
// const openai = new OpenAI({
//     dangerouslyAllowBrowser: true
// })

/** HuggingFace setup **/
import { HfInference } from '@huggingface/inference'
const hf = new HfInference()
import { blobToBase64 } from '/utils'

const dialogModal = document.getElementById('dialog-modal')
dialogModal.show()

document.addEventListener('submit', function(e) {
    e.preventDefault()
    const imageDescription = document.getElementById('user-input').value
    dialogModal.close()
    generateImage(imageDescription)
})

async function generateImage(imageToGenerate) {
    /** OpenAI **/
    // const response = await openai.images.generate({
    //     model: "dall-e-2",
    //     prompt: imageToGenerate,
    //     size: "256x256"
    // })
    // generateAltText(response.data[0].url)

    /** HuggingFace **/
    const response = await hf.textToImage({
        inputs: imageToGenerate,
        model: "stabilityai/stable-diffusion-2",
    })
    const imageUrl = await blobToBase64(response)
    generateAltText(imageUrl)
}

async function generateAltText(imageUrl) {
    /**
    * 🎄 Challenge:
    * 1. Use AI to generate alt text for the
    *    image provided by generateImage().
    * 2. Pass the alt text to renderImage() 
    *    as a parameter. 
    *
    * 🎁 hint.md for help!
    **/
    renderImage(imageUrl) 
}

function renderImage(imageUrl, altText) {
    console.log(altText)
    const imageContainer = document.getElementById('image-container')
    imageContainer.innerHTML = ''
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altText
    imageContainer.appendChild(image)
}