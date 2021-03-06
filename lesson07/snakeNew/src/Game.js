class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     */
    init(settings, status, board, snake, menu, food) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
    }

    /**
     * Метод назначает обработчики на события клика на кнопки "Старт",
     * "Пауза", а также на стрелки на клавиатуре.
     */
    run() {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }

    /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. перемещение змейки на противоположную сторону если следующий шаг - стена
     * 3. проверяет проиграна/выиграна ли игра
     * 4. увеличивает размер змейки если она ест еду
     * 5. заново отрисовывает положение змейки и еды
     * 6. генерирует счёт игры
     */
    doTick() {
        this.snake.performStep();
        // 3.2.Убрать границы поля, т.е. при пересечении границы поля, змейка появляется с противоположной
        // стороны, т.е. чтобы она не врезалась в стены.
        this.movingOppositeSide();
        // 3.3.Сделать, чтобы если змейка ест сама себя, то наступал проигрыш.
        if (this.isGameLost()) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
        // 3. (не обязательное задание, сложное)
        // 3.1.Выводить счёт игры в режиме реального времени.
        this.board.renderScore(this.snake.body.length);
    }

    /**
     * Метод проверяет выиграна ли игра, останавливает игру,
     * выводит сообщение о выигрыше.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы выиграли');
            return true;
        }
        return false;
    }

    // 3.3.Сделать, чтобы если змейка ест сама себя, то наступал проигрыш.
    /**
     * Метод проверяет проиграна ли игра, останавливает игру
     * в случае проигрыша, выводит сообщение о проигрыше.
     * @returns {boolean} если мы шагнули на своё тело, тогда
     * true, иначе false.
     */
    isGameLost() {
        if (this.board.isNextStepToBody(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text
     */
    setMessage(text) {
        this.messageEl.innerText = text;
    }

    // 3.2.Убрать границы поля, т.е. при пересечении границы поля, змейка появляется с противоположной
    // стороны, т.е. чтобы она не врезалась в стены.
    /**
     * Метод проверяет, если следующий шаг - стена, перемещает змейку на противоположную сторону
     */
    movingOppositeSide() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            if (this.snake.body[0].x > this.settings.rowsCount) {
                this.snake.body[0].x = 0;
            } else if (this.snake.body[0].x < 0) {
                this.snake.body[0].x = this.settings.rowsCount;
            } else if (this.snake.body[0].y > this.settings.colsCount) {
                this.snake.body[0].y = 0;
            } else if (this.snake.body[0].y < 0) {
                this.snake.body[0].y = this.settings.colsCount;
            }
        }
    }
}