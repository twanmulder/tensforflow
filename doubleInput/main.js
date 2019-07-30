window.onload = function() {
    // Set up model
    const model = tf.sequential()

    // Add layers to model
    model.add(tf.layers.dense({units: 1, inputShape: [1]}))
    model.add(tf.layers.dense({units: 64, inputShape: [1]}))
    model.add(tf.layers.dense({units: 1, inputShape: [64]}))

    // Add parameters to model
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})

    // Set inputs
    const xs = tf.tensor2d([1, 2, 3, 4, 5], [5, 1])

    // Set outputs
    const ys = tf.tensor2d([2, 4, 6, 8, 10], [5, 1])

    // Fit model
    model.fit(xs, ys, {epochs: 10})

    function handlePredictClick() {
        // Get value inside input element
        let inputPredict = parseInt(document.getElementsByTagName('input')[1].value);
        // Let model predict using this value
        let prediction = model.predict(tf.tensor2d([inputPredict], [1, 1]));
        // Push this prediction to the DOM
        let output = document.querySelector('.output');
        output.innerHTML = prediction.dataSync()[0];
    }

    function handleRetrainClick(){
        // Get value inside input element
        let inputRetrain = parseInt(document.getElementsByTagName('input')[0].value);
        // Retrain model
        model.fit(xs, ys, {epochs: inputRetrain}).then(() => {
            // Alert
            alert('Done training!')
        })
    }

    document.getElementsByTagName('button')[0].addEventListener("click", handleRetrainClick);
    document.getElementsByTagName('button')[1].addEventListener("click", handlePredictClick);
}