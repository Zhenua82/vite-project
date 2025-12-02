//Отличие jsx от html:
function JsxHtml(){

    return (
        <>
        <input id="input" value={'vvod'}/> {/* в html прокатило бы и <input id="input" value={'vvod'}> */}
        {/* Значение в поле ввода в реакте остается неизменным из-за контроля реакта над этим полем (invalid) */}
        {/* value  в реакте это prop и его значением может быть все что угодно (объект, число, строка и т.д.), а в html - это атрибут и его значение всегда строка */}
        <input id="inputt" maxLength={8}/> {/* в html <inputt id="inputt" maxlength='8'> (в консоли можно набрать inputt.getAttribute('maxlength') или inputt.maxLength) */}
        <input id="inputtt" disabled ={false}/> {/* в реакте disabled ={false} - disabled работать не будет, а в html <input id="input" disabled = 'false'> disabled, будет работать! (просто будет иметь значение false)*/}
        <input id="inputttt" disabled ={true} 
        style={
            {color: 'purple',
            border: '2px solid green',
            backgroundColor: 'yellow'
            }// в html: style="color: purple; border: 2px solid green; background-color: yellow;"
        } 
        className="inputttt"/> {/* в html: class="inputttt" */}
        </>
    )
}
export default JsxHtml