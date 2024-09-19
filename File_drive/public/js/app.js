// public/js/app.js

const openFileButton = document.getElementById('openFile');
const fileContent = document.getElementById('fileContent');

openFileButton.onclick = async () => {
    const options = {
        types: [
            {
                description: 'Text and Image Files',
                accept: {
                    'text/plain': ['.txt'],
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png'],
                },
            },
        ],
    };

    const [fileHandle] = await showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const fileType = file.type;

    if (fileType.startsWith('text/')) {
        const contents = await file.text();
        fileContent.innerText = contents;
    } else if (fileType.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        fileContent.innerHTML = `<img src="${imageUrl}" alt="Selected Image" style="max-width: 100%; height: auto;">`;
    } else {
        fileContent.innerText = 'Unsupported file type';
    }
};

/* const openFileButton = document.getElementById('openFile')
const fileContent =document.getElementById('fileContent')

openFileButton.onclick= async () => {
    const options ={
        types:[
            {
                description:'text and Image Files',
                accept:{
                    'text/plain':['.txt'],
                    'image/jpeg':['.jpg', '.jpeg']
                },
            },
        ],
    }
    const [fileHandle] =await showOpenFilePicker(options)
    const file =await fileHandle.getFile()
    const contents =await file.text()
    console.log(contents);

    fileContent.innerText=contents
    
} */

/* const openFileButton = document.getElementById('openFile');
const fileContent = document.getElementById('fileContent');

openFileButton.onclick = async () => {
    const options = {
        types: [
            {
                description: 'Text and Image Files',
                accept: {
                    'text/plain': ['.txt'],
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png'],
                },
            },
        ],
    };

    const [fileHandle] = await showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const fileType = file.type;

    if (fileType.startsWith('text/')) {
        const contents = await file.text();
        fileContent.innerText = contents;
    } else if (fileType.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        fileContent.innerHTML = `<img src="${imageUrl}" alt="Selected Image" style="max-width: 100%; height: auto;">`;
    } else {
        fileContent.innerText = 'Unsupported file type';
    }
}; */
