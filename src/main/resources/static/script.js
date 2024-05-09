function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    for (const name in files) {
        formData.append("image", files[name]);
    }

    fetch('/analyze', {
        method: 'POST',
        headers: {
        },
        body: formData
    }).then(
        response => {
            console.log(response)
            response.text().then(function (text) {
                const predictions = JSON.parse(text);
                predictions.sort((a, b) => b.probability - a.probability);

                const top1 = document.getElementById('top1');
                top1.insertCell().textContent = predictions[0].className;
                top1.insertCell().textContent = predictions[0].probability.toFixed(4);

                const top2 = document.getElementById('top2');
                top2.insertCell().textContent = predictions[1].className;
                top2.insertCell().textContent = predictions[1].probability.toFixed(4);

                const top3 = document.getElementById('top3');
                top3.insertCell().textContent = predictions[2].className;
                top3.insertCell().textContent = predictions[2].probability.toFixed(4);
            })

        }
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );

}