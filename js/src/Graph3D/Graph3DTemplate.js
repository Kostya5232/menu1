Template.prototype.Graph3DTemplate = () => `
<div class= 'canvas3DContain'>

    <div class="canvas3D">
        <canvas id="canvas3D"></canvas>
    </div>
    
    <div class = 'selectFigur' id = 'selectFigur'>
        <select id="figures">
            <option class='figur' value="void">Фигуры</option>
            <option class='figur' value="Cube">Куб</option>
            <option class='figur' value="Sphere">Сфера</option>
            <option class='figur' value="Cone">Конус</option>
            <option class='figur' value="Ellipsiloid">Элипсоид</option>
            <option class='figur' value="Tor">Тор</option>
            <option class='figur' value="HyperbolicParaboloid">Седло</option>
            <option class='figur' value="Cylinder">Цилиндр</option>
            <option class='figur' value="OneWayHyperboloid">Однополосый гиперболоид</option>
            <option class='figur' value="TwoWayHyperboloid">Двухполосый гиперболоид</option>
            <option class='figur' value="EllipticalParabaloid">Эллиптический гиперболоид</option>
            <option class='figur' value="ParabalidCylinder">Параболический цилиндр</option>
            <option class='figur' value="HyperbolicCylinder">Гипербалический цилиндр</option>
            <option class='figur' value="SolarSystem">Солнечная система</option>

            
            </select>
            <input type="checkbox" class="checkboxGraph" value  = 'pointsCheckbox' checked>
            <span class="pointsTrue">Точки</span>
            <input type="checkbox" class="checkboxGraph" value = 'edgesCheckbox' checked>
            <span class="edgesTrue">Грани</span>
            <input type="checkbox" class="checkboxGraph" value = 'polygonsCheckbox' checked>
            <span class="polygonsTrue">Полигоны</span>
            <input type="checkbox" class="checkboxGraph" value = 'lumenCheckbox' checked>
            <span class="lumenTrue">Свет</span>
            <!--<input type="checkbox" class="checkboxGraph" value = 'animationCheckbox' checked>
            <span class="lumenTrue">Аниме</span> -->

            <div id='Elements'></div>
    </div>
      
        
</div>
`;
