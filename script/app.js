const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	
	new Question(" Какой полис в Греции был силен в военном отношении  ", 
	[
		new Answer('Фивы', 0),
		new Answer("Афины  ", 0),
		new Answer("Коринф", 0),
		new Answer("Спарта", 1)
	]),
	new Question("Подвиг этих спартанцев вошел в историю при Фермопилах", 
	[
		new Answer('300 спартанцев', 1),
		new Answer("600 спартанцев", 0),
		new Answer("500 спартанцев", 0),
		new Answer("400 спартанцев", 0)
	]),
	new Question("Этот правитель избирался более чем 15 раз на должность стратега Афин", 
	[
		new Answer('Сократ ', 0),
		new Answer("Драконт", 0),
		new Answer(" Солон ", 0),
		new Answer(" Перикл", 1)
	]),
	new Question("Какой правитель Афин прославился  жестокими даже суровыми  писанными законами  ", 
	[
		new Answer('Солон ', 0),
		new Answer("Драконт", 1),
		new Answer("Перикл", 0),
		new Answer("Калигула", 0)
	]),
	new Question("Эта великая династия правила в Персии в 5 веке", 
	[
		new Answer('Ахемениды ', 1),
		new Answer("Кепрулю ", 0),
		new Answer("Сефевиды ", 0),
		new Answer("Сасаниды", 0)

	]),
	new Question(" Власть народа так с греческого переводиться слово", 
	[
		new Answer('Аристократия ', 0),
		new Answer("Демократия", 1),
		new Answer("Олигархия ", 0),
		new Answer("Русские", 0)
	]),
	new Question("Власть немногих так в Спарте называлась форма правления", 
	[
		new Answer('Тирания', 0),
		new Answer("Автократия", 0),
		new Answer("Олигархия", 1),
		new Answer("Демократия", 0)
	]),
	new Question("Как геродот и Платон назвал войны между двумя странами в 5 веке что это за войны", 
	[
		new Answer('Вьетнамские', 0),
		new Answer("Греко-Персидские ", 1),
		new Answer("Греко-Микенские", 0),
		new Answer("Египетские", 0)
	]),
	new Question("Марафонская битва произошла в ", 
	[
		new Answer('490 году до.н.э', 1),
		new Answer("480 году до.н.э", 0),
		new Answer("470 году до.н.э", 0),
		new Answer("460 году до.н.э", 0)
	]),
	new Question("Битва при Саламине произошло в ...", 
	[
		new Answer('450 году до.н.э', 0),
		new Answer("470 году до.н.э", 0),
		new Answer("480 году до.н.э", 1),
		new Answer("490 году до.н.э", 0)
	]),


	new Question("Фермопильское сражение произошло в ", 
	[
		new Answer('450 году до.н.э ', 0),
		new Answer("460 году до.н.э ", 0),
		new Answer("470 году до.н.э ", 0),
		new Answer("480 году до.н.э", 1)
	]),
	new Question("Персидский царь воевавший против Спарты и Афин после смерти Дария", 
	[
		new Answer('Ксеркс', 1),
		new Answer("Дарий III", 0),
		new Answer("Леонид", 0),
		new Answer("Кир", 0)
	]),
	new Question("Какая из сторон конфликта проиграла в  Греко-Персидских войнах", 
	[
		new Answer('Римляне', 0),
		new Answer("Германцы ", 0),
		new Answer("Персы ", 0),
		new Answer("Греки", 1)
	]),
	new Question("Народное собрание в Афинах", 
	[
		new Answer('Сенат', 0),
		new Answer("Эклессия", 1),
		new Answer("Агора", 0),
		new Answer("Акрополь", 0)
	]),
	new Question("Рыночная площадь в Афнах место народных обсуждений", 
	[
		new Answer('Агора ', 1),
		new Answer("Театр", 0),
		new Answer("Акрополь", 0),
		new Answer("Парфенон", 0)

	]),

	new Question("Греки словно как эти животные прыгают с одного острова на другой ", 
	[
		new Answer('Жабы', 0),
		new Answer("Лягушки  ", 1),
		new Answer("Зайцы ", 0),
		new Answer("Кузнечики", 0)
	]),
	new Question("Ахеменидская динсатия Персидкой имперрии это династия какой  современной страны?", 
	[
		new Answer('Ирана', 1),
		new Answer("Ирака", 0),
		new Answer("Турции", 0),
		new Answer("Египта", 0)
	]),
	new Question("Кто принял указ убрать долговые камни и облегчить жизнь рабов в Греции", 
	[
		new Answer('Драконт', 0),
		new Answer("Перикл", 0),
		new Answer("Автосолон", 0),
		new Answer("Солон", 1)
	]),
	new Question("Пелопоннес – это", 
	[
		new Answer('Остров в Греции', 0),
		new Answer("Полуостров в Греции", 1),
		new Answer("Город в Греции", 0),
		new Answer("Страна в Греции", 0)
	]),
	new Question("Триера- это:", 
	[
		new Answer(' Военный корабль ', 1),
		new Answer("Самолет", 0),
		new Answer("Автомобиль", 0),
		new Answer("Оружие", 0)

	]),

	new Question("Кордовский халифат это на самом дела страна...", 
	[
		new Answer('Франция', 0),
		new Answer("Испания ", 1),
		new Answer("Марокко", 0),
		new Answer("Алжир", 0)
	]),
	new Question("Известный древнегреческий историк, друг Перикла и «Отец истории»:", 
	[
		new Answer('Геродот', 1),
		new Answer("Аристотель", 0),
		new Answer("Архимед", 0),
		new Answer("Фемистокл", 0)
	]),
	new Question("Место для сооружения храмов в Афинах называлось:", 
	[
		new Answer('Пропилеи', 0),
		new Answer("Парфенон", 0),
		new Answer("Агора", 0),
		new Answer("Акрополь", 1)
	]),
	new Question("Как называють кунсткамеры для содержания евреев и славян в неволе и далнейшего их уничтожения", 
	[
		new Answer('Кунсткамеры ', 0),
		new Answer("Концлагери", 1),
		new Answer("Тюрьмы", 0),
		new Answer("не знаю", 0)
	]),
	new Question("Какую богиню называли «воительница»:", 
	[
		new Answer(' Афина', 1),
		new Answer("Афродита", 0),
		new Answer("Гера", 0),
		new Answer("Лера", 0)

	]),

	new Question("На склонах гор древние греки выращивали:", 
	[
		new Answer('Оливки', 1),
		new Answer("Апельсины", 0),
		new Answer("Клубнику", 0),
		new Answer("Яблоки", 0)
	]),

	new Question(" Как звали спартанского полководца, сражавшегося с персами при Фермопилах?", 
	[
		new Answer('Фемистокол', 0),
		new Answer("Леонид", 1),
		new Answer("Милан", 0),
		new Answer("Москва", 0)
	]),
	new Question("Какое расстояние пробежал воин от Марафона к Афинам, чтобы сообщить весть о победе греков?", 
	[
		new Answer('35км ', 0),
		new Answer("300км", 0),
		new Answer("42 км", 1),
		new Answer("62 км", 0)

	]),

	new Question(" Как звали полководца, возглавившего греческие войска?", 
	[
		new Answer('Саламин', 0),
		new Answer("Мильтиад ", 1),
		new Answer("Фемистокол", 0),
		new Answer("Александр", 0)
	]),
	new Question("Кто возглавлял Персию в начале греко-персидских войн?", 
	[
		new Answer('Дарий 1', 1),
		new Answer("Дарий 2 ", 0),
		new Answer("Дарий 3", 0),
		new Answer("Дарий 4 ", 0)
	]),


];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



