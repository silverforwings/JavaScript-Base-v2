'use strict';

// 1. Объясните почему код даёт именно такие результаты?
// Подсказка. Чтобы лучше разобраться возьмите этот код и запустите в отладчике в браузере со
// включенными точками остановки.
// //пример 1
//     let a = 1, b = 1, c, d;
// c = ++a;
// alert(c); // ответ: 2
// //пример 2
// d = b++;
// alert(d); //ответ: 1
// //пример 3
// c = 2 + ++a;
// alert(c); //ответ: 5
// //пример 4
// d = 2 + b++;
// alert(d); //ответ: 4
// alert(a); //3
// alert(b); //3


let a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 - c присвается a с префиксным инкрементом, соответсвенно 1 + 1 = 2
d = b++; alert(d);           // 1 - d присвается b (1), затем b увеличивается на 1 постфиксным инкрементом
c = 2+ ++a; alert(c);      // 5 - к 2 прибавляется a увеличенная на 1 префиксным инкрементом. 2 + (2 + 1) = 5
d = 2+ b++; alert(d);      // 4 - к 2 прибавляется b. 2 + 2 = 4. Затем b увеличивается на 1 постфиксным инкрементом = 3
alert(a);                    // 3 - последний префиксный инкремент увеличил а на 1, поучилось 3
alert(b);                    // 3 - последний постфиксный инкремент увеличил b на 1, поучилось 3
