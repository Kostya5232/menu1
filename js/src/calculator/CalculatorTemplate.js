Template.prototype.calculatorTemplate = () => `

    <div id="CommCalculater">
        <div class="Calculator">
            <h1>Калькулятор</h1>
            <div id="Inputs">
                <textarea id="inputA" class = 'inputCalc' placeholder="Первое число"></textarea>
                <textarea id="inputB" class = 'inputCalc' placeholder="Второе число"></textarea>
            </div>
            <div id="container">
                <button class="operand-calc" data-operand="add">add</button>
                <button class="operand-calc" data-operand="sub">sub</button>
                <button class="operand-calc" data-operand="mult">mult</button>
                <button class="operand-calc" data-operand="div">div</button>
                <button class="operand-calc" data-operand="prod">prod</button>
                <button class="operand-calc" data-operand="pow">pow</button>
                <button class="operand-calc" data-operand="one">one</button>
                <button class="operand-calc" data-operand="zero">zero</button>
            </div>
            <textarea id="CalcResult" placeholder="Ответ"></textarea>
        </div>
    </div>
    <div id="PolyCalculater">
        <div class="Polynomial">
            <h1>Полиномы</h1>
            <div id="Inputs">
                <textarea id="p1" class = 'inputCalc' placeholder="Первый полином"></textarea>
                <textarea id="p2" class = 'inputCalc' placeholder="Второй полином"></textarea>
                <textarea type="number" id="inputX" placeholder="Значение x"></textarea>
            </div>
            <div>
                <button class="operand-poly" data-operand="add">+</button>
                <button class="operand-poly" data-operand="sub">-</button>
                <button class="operand-poly" data-operand="mult">*</button>
                </div>
                <div id="res"></div>
                
                <textarea id="PolyResult" placeholder="Ответ"></textarea>
            <div>
                <button class="operand-result" data-operand="point">Point</button>
            </div>
        </div>
    </div> 
    </div>
`;
