
    const fileupload = document.getElementById('fileupload')
    const submitButton = document.getElementById('submit')
    const image = document.getElementById('pslImage')

    fileupload.addEventListener('change', () => {
    const files = fileupload.files;
        image.src = URL.createObjectURL(files[0])
        image.style.display = "block"
        image.style.width = 50
        image.style.height = 50
    })

    function preprocess(img) {
        let tensor = tf.fromPixels(img)
        const resized = tf.image.resizeBilinear(tensor, [224, 224]).toFloat()
        const offset = tf.scalar(255.0);
        const normalized = tf.scalar(1.0).sub(resized.div(offset));
        const batched = normalized.expandDims(0)
        return batched
    }

    function predictionResult(matrix) {
        max_index = 0
        for(i = 0; i< matrix.length; i++) {
            if(matrix[i] > matrix[max_index]) {
                max_index = i
            }
        }
        return max_index
    }


    tf.loadModel('model/model.json')
    .then((model) => {
        console.log('Model is loaded')
        submitButton.addEventListener('click', () => {
            const labels = ['mel', 'vasc', 'nv', 'bkl', 'ns']
            const pred = model.predict(preprocess(image)).dataSync()
            const classification_result = predictionResult(pred)
            const classification_class = labels[classification_result]
            alert(`The predected category of pigmented skin lesion is ${classification_class}. I recommend to book an appointment with medical professional`)
        })
    })
    .catch((error) => console.log(error))
