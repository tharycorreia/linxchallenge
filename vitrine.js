//esperar o dom ser construído
document.addEventListener('DOMContentLoaded', (event) => {
    window.X = (obj) => { window.objChallenge = obj }
    //requisição retorna a chamada de uma função
    let script = document.createElement('script');
    script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    document.getElementsByTagName('head')[0].appendChild(script);
    let recommendation = 0
    let maxPagination = 0;
    let interval = setTimeout(() => {
        if (window.objChallenge && objChallenge.data && objChallenge.data.reference && objChallenge.data.reference.item) {
            let referenceItem = objChallenge.data.reference.item;
            recommendation = objChallenge.data.recommendation
            document.querySelector('.visitou .img img').src = `http:${referenceItem.imageName}`
            document.querySelector('.visitou .de-value').innerText = referenceItem.oldPrice
            document.querySelector('.visitou .titulo p').innerText = referenceItem.name
            document.querySelector('.visitou .por-value').innerText = referenceItem.price
            document.querySelector('.visitou .prestacao').innerHTML = referenceItem.productInfo.paymentConditions

            for (let i = 0; i < recommendation.length; i++) {
                let item = recommendation[i]

                let produto = document.createElement('div')
                produto.setAttribute('class', 'produto')

                let img = document.createElement('div')
                img.setAttribute('class', 'img')

                let imgTag = document.createElement('img')
                imgTag.setAttribute('class', 'produto')

                let texto = document.createElement('div')
                texto.setAttribute('class', 'texto')

                let titulo = document.createElement('div')
                titulo.setAttribute('class', 'titulo')

                let p = document.createElement('p')
                let valor = document.createElement('div')
                valor.setAttribute('class', 'valor')

                let deLabel = document.createElement('label')
                deLabel.setAttribute('class', 'de-label')
                deLabel.innerText = 'De: '

                let deValue = document.createElement('div')
                deValue.setAttribute('class', 'de-value')

                let porLabel = document.createElement('label')
                porLabel.setAttribute('class', 'por-label')
                porLabel.innerText = 'Por: '

                let porValue = document.createElement('div')
                porValue.setAttribute('class', 'por-value')

                let prestacao = document.createElement('div')
                prestacao.setAttribute('class', 'prestacao')

                let br = document.createElement('br')

                imgTag.src = `http:${item.imageName}`
                deValue.innerText = item.oldPrice
                p.innerText = item.name
                porValue.innerText = item.price
                prestacao.innerHTML = item.productInfo.paymentConditions

                produto.append(img)
                produto.append(texto)
                img.append(imgTag)
                texto.append(titulo)
                titulo.append(p)
                texto.append(valor)
                valor.append(deLabel)
                valor.append(deValue)
                valor.append(br)
                valor.append(porLabel)
                valor.append(porValue)
                valor.append(prestacao)

                document.querySelector('.interesse .produtos').append(produto)

            }
            maxPagination = recommendation.length - parseInt(document.querySelector('.produtos').offsetWidth) / parseInt(document.querySelector('.produto').offsetWidth)
            clearTimeout(interval)
        }
    }, 500);
    let contadorPagination = 0;
    document.querySelector('.button.avancar').addEventListener("click", () => {
        if (contadorPagination < maxPagination) {
            let position = document.querySelector('.produtos .produto').style.marginLeft.replace('px', '')
            if (position) {
                position = parseInt(position)
            }
            document.querySelectorAll('.produtos .produto')[0].style.marginLeft = `${position + (-200)}px`
            contadorPagination++
        }
    });
    document.querySelector('.button.voltar').addEventListener("click", () => {
        if (contadorPagination > 0) {
            let position = parseInt(document.querySelector('.produtos .produto').style.marginLeft.replace('px', ''))
            document.querySelectorAll('.produtos .produto')[0].style.marginLeft = `${position + 200}px`
            contadorPagination--
        }
    });

})