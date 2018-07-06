'strict';

/**
    Programa:   Jogo da Velha
    Autor:      Fábio Moura de Oliveira
    Descrição:  Este programa foi criada com base no programa criado pelo professor
                Bonieky Lacerda do curso React Native do Zero ao Profissional.
                No programa original, do curso, o usuário do jogo marca as células
                do jogo da velha e é alternado entre a vez do circulo e do x.
                Ou seja, no programa, o professor demonstrou como criar o jogo da velha,
                entretanto, o jogador joga contra si próprio, ou seja, o jogador
                joga o 'x' e depois o 'o'.
                Aqui, eu fiz uma adaptação pra que o jogador jogue contra o computador.
                No caso do computador, ele utilizará o círculo 'o'.
**/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableHighlight, Button } from 'react-native';
import { X } from './src/x';
import { O } from './src/o';

export default class JogoDaVelha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empate: 'nao',
            ganhador: '',
            tabuleiro_bloqueado: 'nao',
            vez: 'x',

            // status: 1,
            // aviso: '',
            // vez: 'x',
            // a1: '',
            // a2: '',
            // a3: '',
            // b1: '',
            // b2: '',
            // b3: '',
            // c1: '',
            // c2: '',
            // c3: '',

            tabuleiro: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]

        };

        console.log(this.state.tabuleiro);

    }

    /**
        Ao clicar, na células do tabuleiro, será enviado um número.
        Este número indica o índice da célula no tabuleiro.
    **/
    clicou_na_celula(indice_celula) {
        console.log('indice_celula:' + indice_celula);

        let linha_clicada = Math.trunc(indice_celula / 3);
        let coluna_clicada = indice_celula % 3;

        console.log("linha: " + linha_clicada + ", coluna: " + coluna_clicada);

        let celula_atual = this.state.tabuleiro[linha_clicada][coluna_clicada];
        console.log(this.state.tabuleiro);

        if (celula_atual === '' && this.state.tabuleiro_bloqueado === 'nao') {
            this.state.tabuleiro[linha_clicada][coluna_clicada] = this.state.vez;

            this.state.ganhador = '';
            this.state.empate = '';

            this.verificar_marcacoes('x');

            if (this.state.ganhador === 'x' || this.state.empate === 'sim') {
                this.state.tabuleiro_bloqueado = 'sim';
                this.setState(this.state);
                return;
            }

            this.verificar_marcacoes('o');

            if (this.state.ganhador === 'o' || this.state.empate === 'sim') {
                this.state.tabuleiro_bloqueado = 'sim';
                this.setState(this.state);
                return;
            }

            this.setState(this.state);

            this.vez_do_computador_2();

            this.verificar_marcacoes('x');

            if (this.state.ganhador === 'x' || this.state.empate === 'sim') {
                this.state.tabuleiro_bloqueado = 'sim';
                this.setState(this.state);
                return;
            }

            this.verificar_marcacoes('o');

            if (this.state.ganhador === 'o' || this.state.empate === 'sim') {
                this.state.tabuleiro_bloqueado = 'sim';
                this.setState(this.state);
                return;
            }

            this.setState(this.state);

        }
    }

    verificar_marcacoes(vez_de) {

        // Contabiliza a quantidade de células não-vazias.
        let qt_celulas_nao_vazias = 0;

        // Verificar linhas.
        for (let linha = 0; linha < 3; linha++) {
            // No loop abaixo, percorre todas as colunas da linha atual.
            let qt_marcacoes = 0;
            for (let coluna = 0; coluna < 3; coluna++) {
                let celula_atual = this.state.tabuleiro[linha][coluna];

                if (celula_atual === vez_de) {
                    qt_marcacoes++;
                }

                if (celula_atual !== '') {
                    qt_celulas_nao_vazias++;
                }

            }

            // Se há três células marcadas do mesmo jogador, então, define-o
            // vencedor.
            if (qt_marcacoes === 3) {
                this.state.ganhador = vez_de;

                return;
            }
        }

        // Verificar as colunas.
        //qt_celulas_nao_vazias = 0;
        for (let coluna = 0; coluna < 3; coluna++) {
            // No loop abaixo, percorre todas as colunas da linha atual.
            let qt_marcacoes = 0;
            for (let linha = 0; linha < 3; linha++) {
                let celula_atual = this.state.tabuleiro[linha][coluna];

                if (celula_atual === vez_de) {
                    qt_marcacoes++;
                }

            }

            // Se há três células marcadas do mesmo jogador, então, define-o
            // vencedor.
            if (qt_marcacoes === 3) {
                this.state.ganhador = vez_de;

                return;
            }
        }

        // Verificar Diagonal Superior Esquerda a Diagonal Inferior Direita.
        let qt_marcacoes = 0;
        for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {
            let celula_atual = this.state.tabuleiro[linha_coluna][linha_coluna];
            if (celula_atual === vez_de) {
                qt_marcacoes++;
                console.log('linha_coluna:' + linha_coluna);
                console.log(celula_atual);
            }
            console.log("celula_atual: " + celula_atual);
        }

        // Se há três células marcadas do mesmo jogador, então, define-o
        // vencedor.
        if (qt_marcacoes === 3) {
            this.state.ganhador = vez_de;
            return;
        }

        // Verificar Diagonal superior direita até diagonal inferior esquerda.
        qt_marcacoes = 0;
        coluna = 2;
        for (let linha = 0; linha < 3; linha++) {
            let celula_atual = this.state.tabuleiro[linha][coluna];

            if (celula_atual === vez_de) {
                qt_marcacoes++;
            }

            coluna--;
        }

        // Se há três células marcadas do mesmo jogador, então, define-o
        // vencedor.
        if (qt_marcacoes === 3) {
            this.state.ganhador = vez_de;
            return;
        }

        // Se chegarmos aqui, iremos verificar se todas as células foram preenchidas.
        if (qt_celulas_nao_vazias === 9) {
            this.state.ganhador = '';
            this.state.empate = 'sim';
        }
    }

    resetar_tabuleiro() {
        this.state.ganhador = '';
        this.state.empate = 'nao';
        this.state.vez = 'x';
        this.state.tabuleiro_bloqueado = 'nao';

        for (let linha = 0; linha < 3; linha++) {
            for (let coluna = 0; coluna < 3; coluna++) {
                this.state.tabuleiro[linha][coluna] = '';
            }
        }

        this.setState(this.state);
    }

    // clicou(p) {
    //     let state = this.state;
    //     return;


    //     if (eval('state.' + p) === '' && state.status === 1) {
    //         eval('state.' + p + '= state.vez'
    //         );

    //         if (state.vez === 'x') {
    //             state.vez = 'o';
    //             this.setState(state);
    //             this.verificar('x');
    //             this.verificar('o');

    //             this.vez_do_computador();
    //             this.verificar('x');
    //             this.verificar('o');
    //             state.vez = 'x';
    //         } else {
    //             state.vez = 'x';
    //         }
    //     }

    //     this.setState(state);

    //     this.verificar('x');
    //     this.verificar('o');
    // }

    // verificar(item) {
    //     let state = this.state;

    //     // Horizontalmente.
    //     if ((state.a1 === item && state.b1 === item && state.c1 === item) ||
    //         (state.a2 === item && state.b2 === item && state.c2 === item) ||
    //         (state.a3 === item && state.b3 === item && state.c3 === item) ||
    //         (state.a1 === item && state.a2 === item && state.a3 === item) ||
    //         (state.b1 === item && state.b2 === item && state.b3 === item) ||
    //         (state.c1 === item && state.c2 === item && state.c3 === item) ||
    //         (state.a1 === item && state.b2 === item && state.c3 === item) ||
    //         (state.c1 === item && state.b2 === item && state.a3 === item)
    //     ) {
    //         state.aviso = item + ' ganhou.';
    //         state.status = 0;
    //         state.ganhador = item;
    //     }

    //     if (state.status === 1) {
    //         if (state.a1 !== '' && state.a2 !== '' && state.a3 !== '' &&
    //             state.b1 !== '' && state.b2 !== '' && state.b3 !== '' &&
    //             state.c1 !== '' && state.c2 !== '' && state.c3 !== '') {
    //             state.aviso = '** EMPATE **';
    //             state.status = 0;
    //         }
    //     }

    //     this.setState(state);
    // }

    // Toda vez que for a vez do computador, este método será chamado.
    // A vez do computador será quando a vez for do 'o'.
    // vez_do_computador() {
    //     state = this.state;

    //     // Atribui os valores para o arranjo.
    //     state.tabuleiro[0][0] = state.a1;
    //     state.tabuleiro[0][1] = state.b1;
    //     state.tabuleiro[0][2] = state.c1;
    //     state.tabuleiro[1][0] = state.a2;
    //     state.tabuleiro[1][1] = state.b2;
    //     state.tabuleiro[1][2] = state.c2;
    //     state.tabuleiro[2][0] = state.a3;
    //     state.tabuleiro[2][1] = state.b3;
    //     state.tabuleiro[2][2] = state.c3;

    //     // O algoritmo abaixo, indica como o computador joga contra o jogador humano..
    //     // Crie dois vetores: marcacoes_do_computador e marcacoes_do_jogador.
    //     // Tais vetores tem o comprimento igual a 8, onde, o índice 0 a 2, corresponde
    //     // as linhas 0 a 2 do tabuleiro; o índice 3 a 5, corresponde as colunas 0
    //     // a 2 do tabuleiro; o índice 6, corresponde à diagonal do canto superior esquerdo
    //     // até o canto inferior direito e o índice 7, corresponde à diagonal do
    //     // canto superior direito até o canto inferior esquerdo.
    //     // O vetor marcacoes_do_computador armazena a contabilização das marcações
    //     // do computador e o vetor marcacoes_do_jogador armazena as marcações do
    //     // jogador humano.

    //     // Percorra cada linha do tabuleiro,
    //     // pra cada linha a ser percorrida, contabilize:
    //     // a quantidade de marcações do computador,
    //     // a quantidade de marcações do jogador humano.
    //     // Armazene a contabilização de marcações do computador no vetor
    //     // marcacoes_do_computador na posição do índice que corresponde a esta linha
    //     // conforme descrito acima.
    //     // O mesmo pra as marcacoes_do_jogador, no vetor 'marcacoes_do_jogador'.

    //     // Faça o mesmo procedimento pra as colunas do tabuleiro
    //     // e em seguida, pra as duas diagonais do tabuleiro.

    //     // Abaixo, há o layout onde deve ser armazenado a contabilização:
    //     // Observe que, a interseção de linha e coluna é representado desta
    //     // forma: [x,y], onde x representa a linha e y a coluna, desta forma
    //     // fica fácil identificar em quql posição do vetor deve ser armazenada
    //     // a contabilização.
    //     // [  TABULEIRO  ]      [VETOR]
    //     // [0,0][0,1][0,2]      [0]
    //     // [1,0][1,1][1,2]      [1]
    //     // [2,0][2,1][2,2]      [2]
    //     //
    //     // [ 3] [ 4 ][ 5 ] <<< [VETOR]

    //     // O computador deve fazer verificações pra identificar qual a melhor
    //     // posição pra jogar impedindo que o jogador ganhe, isto é bem simples,
    //     // Após, percorrer linhas, colunas e as duas diagonais, o computador
    //     // irá verificar se ao marcar uma célula vazia ele poderá ou não,
    //     // se não puder ganhar, o computador deverá verificar as marcações
    //     // do jogador e marcar a célula vazia pra impedir que o jogador ganhe
    //     // na próxima jogada.
    //     // Isto é bem simples, primeiro iremos percorrer, todo os vetores
    //     // procurando contabilizações desta forma nos dois vetores na mesma
    //     // posição do índice desta forma:
    //     // qt_marcacoes_do_computador = 2 and qt_marcacoes_do_computador = 0,
    //     // Isto, indica que duas marcações foram feitas em uma linha, coluna ou diagonal
    //     // e há uma célula vazia. Neste caso, iremos marcar a célula vazia e o computador
    //     // vence.
    //     // Se não há marcações que indica que o computador irá ganhar, devemos,
    //     // procurar as marcações desta forma:
    //     // qt_marcacoes_do_jogador = 2 and qt_marcacoes_do_computador = 0
    //     // Se houver, devemos marcar a célula vazia e retornar da função.

    //     let marcacoes_do_jogador = new Array(8);
    //     let marcacoes_do_computador = new Array(8);

    //     console.log(marcacoes_do_computador);
    //     console.log(this.state.tabuleiro);

    //     // Cada célula terá um índice, então, podemos sortear uma célula vazia
    //     let marcacoes_vazias = [];

    //     // Da esquerda pra direita e de cima pra baixo, haverá um identificador
    //     // único e exclusivo pra cada célula do tabuleiro.
    //     let id_celula = -1;

    //     // No loop abaixo, iremos percorrer cada linha e contabiliza a quantidade
    //     // de marcações realizadas pelo computador e pelo jogador humano.
    //     // Nos vetores, marcacoes_do_computador e marcacoes_do_jogador, os índices
    //     // 0 a 2, corresponde às linhas 0 a 2 do tabuleiro.
    //     let indice_marcacoes = 0;
    //     for (let linha = 0; linha < 3; linha++) {
    //         let qt_marcacoes_do_jogador = 0;
    //         let qt_marcacoes_do_computador = 0;

    //         for (let coluna = 0; coluna < 3; coluna++) {
    //             // Podemos obter o identificador de qualquer célula através da fórmula abaixo.
    //             id_celula = 3 * linha + coluna;

    //             if (state.tabuleiro[linha][coluna] === 'x') {
    //                 qt_marcacoes_do_jogador++;
    //             } else if (state.tabuleiro[linha][coluna] === 'o') {
    //                 qt_marcacoes_do_computador++;
    //             } else if (state.tabuleiro[linha][coluna] === '') {

    //                 marcacoes_vazias.push(id_celula);
    //             }
    //         }
    //         // Armazena as marcações da linha atual.
    //         marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
    //         marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;
    //         indice_marcacoes++;
    //     }

    //     // No loop abaixo, iremos percorrer cada coluna e contabiliza a quantidade
    //     // de marcações realizadas pelo computador e pelo jogador humano.
    //     // Nos vetores, marcacoes_do_computador e marcacoes_do_jogador, os índices
    //     // 3, 4 e 5, corresponde às colunas 0, 1 e 2 do tabuleiro.
    //     for (let coluna = 0; coluna < 3; coluna++) {
    //         let qt_marcacoes_do_jogador = 0;
    //         let qt_marcacoes_do_computador = 0;

    //         for (let linha = 0; linha < 3; linha++) {
    //             id_celula = 3 * linha + coluna;

    //             if (state.tabuleiro[linha][coluna] === 'x') {
    //                 qt_marcacoes_do_jogador++;
    //             } else if (state.tabuleiro[linha][coluna] === 'o') {
    //                 qt_marcacoes_do_computador++;
    //             } else if (state.tabuleiro[linha][coluna] === '') {
    //                 // Observe que ao analisar linha e coluna, uma linha
    //                 // é composta de colunas e uma coluna é composta de linhas
    //                 // então pode acontecer do id da célula se repetir, devemos
    //                 // evitar incluir o mesmo id duas vezes.
    //                 if (marcacoes_vazias.includes(id_celula) === false) {
    //                     marcacoes_vazias.push(id_celula);
    //                 }
    //             }
    //         }

    //         marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
    //         marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;
    //         indice_marcacoes++;
    //     }

    //     // Verifica a diagonal superior esquerda a direita inferior direita.
    //     let qt_marcacoes_do_jogador = 0;
    //     let qt_marcacoes_do_computador = 0;
    //     marcacoes_do_computador[indice_marcacoes] = 0;
    //     marcacoes_do_jogador[indice_marcacoes] = 0;

    //     id_celula = 0;
    //     for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {

    //         if (state.tabuleiro[linha_coluna][linha_coluna] === 'x') {
    //             qt_marcacoes_do_jogador++;
    //         } else if (state.tabuleiro[linha_coluna][linha_coluna] === 'o') {
    //             qt_marcacoes_do_computador++;
    //         } else if (state.tabuleiro[linha_coluna][linha_coluna] === '') {
    //             // Observe que ao analisar linha e coluna, uma linha
    //             // é composta de colunas e uma coluna é composta de linhas
    //             // então pode acontecer do id da célula se repetir, devemos
    //             // evitar isto.
    //             if (marcacoes_vazias.includes(id_celula) === false) {
    //                 id_celula = 3 * linha_coluna + linha_coluna;
    //                 marcacoes_vazias.push(id_celula);
    //             }
    //         }
    //     }

    //     marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
    //     marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;

    //     indice_marcacoes++;
    //     marcacoes_do_computador[indice_marcacoes] = 0;
    //     marcacoes_do_jogador[indice_marcacoes] = 0;

    //     // Verifica diagonal superior direita a inferior esquerda.
    //     coluna = 2;
    //     for (let linha = 0; linha < 3; linha++) {
    //         if (state.tabuleiro[linha][coluna] === 'x') {
    //             qt_marcacoes_do_jogador++;
    //         } else if (state.tabuleiro[linha][coluna] === 'o') {
    //             qt_marcacoes_do_computador++;
    //         } else if (state.tabuleiro[linha][coluna] === '') {
    //             // Observe que ao analisar linha e coluna, uma linha
    //             // é composta de colunas e uma coluna é composta de linhas
    //             // então pode acontecer do id da célula se repetir, devemos
    //             // evitar isto.
    //             if (marcacoes_vazias.includes(id_celula) === false) {
    //                 id_celula = 3 * linha + coluna;
    //                 marcacoes_vazias.push(id_celula);
    //             }
    //         }

    //         // Iremos do canto superior direito pra o canto inferior esquerdo.
    //         // Então, iremos começar da maior coluna e ir diminuindo até chegar
    //         // a zero.
    //         coluna--;
    //     }

    //     marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
    //     marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;

    //     console.log("marcacoes vazias:");
    //     console.log(marcacoes_vazias);

    //     console.log("marcacoes_do_computador:");
    //     console.log(marcacoes_do_computador);

    //     // Aqui, está a inteligência artificial do jogo.
    //     // Nos fors anteriores, contabilizamos a quantidade de marcações
    //     // do computador e do jogador humano, por linha, coluna e as duas diagonais.
    //     // Na jogo da velha, é um tabuleiro 3 por 3, então, pra o computador
    //     // ganhar ele deve ter 3 marcações na mesma linha, na mesma coluna ou na
    //     // mesma diagonal, entretanto, pra isto ser possível, a cada jogada, ele
    //     // deve verificar se há pelo menos duas marcações do computador em uma
    //     // mesma linha, mesma coluna ou diagonal, se sim, o computador deve
    //     // marcar a célula vazia pra vencer o jogo, entretanto, se não é possível
    //     // ganhar ainda, o computador então deve verificar as marcações do jogador
    //     // humano e evitar que o jogador humano vença quando for a vez dele,
    //     // então, o computador deve verificar se em uma mesma coluna, linha ou diagonal
    //     // há duas marcações do jogador se sim, ele deve marcar a célula vazia desta
    //     // linha pra evitar que o jogador marque a mesma quando a vez for passada
    //     // pra ele.

    //     // Há dois vetores: marcacoes_do_jogador e marcacoes_do_jogador.
    //     // Tais vetores tem um tamanho de 8 células, cada índice deste vetor
    //     // corresponde a uma linha, coluna ou diagonal do tabuleiro, que armazena
    //     // a contabilização das marcações.

    //     // No primeiro for, o computador verifica se há alguma linha, coluna ou diagonal
    //     // que garanta que ao marcar a célula vazia que falta garanta a vitória do computador.
    //     // Se não houver, tentaremos impedir que na vez do jogador humano, ele consiga
    //     // obter a vitória.
    //     let indice_a_ser_marcado = -1;
    //     for (let indice_vetor = 0; indice_vetor < 8; indice_vetor++) {
    //         if (marcacoes_do_computador[indice_vetor] === 2 && marcacoes_do_jogador[indice_vetor] === 0) {
    //             indice_a_ser_marcado = indice_vetor;
    //             console.log("Vitoria do computador, indice vetor: " + indice_vetor);
    //             break;
    //         }

    //     }

    //     // Só iremos analisar as jogadas do jogador, se o computador não pode
    //     // ganhar na vez dele, então, tentar impedir a vitória do jogador humano.
    //     if (indice_a_ser_marcado === -1) {
    //         for (let indice_vetor = 0; indice_vetor < 8; indice_vetor++) {
    //             if (marcacoes_do_jogador[indice_vetor] === 2 && marcacoes_do_computador[indice_vetor] === 0) {
    //                 indice_a_ser_marcado = indice_vetor;
    //                 console.log("Bloqueado vitória do jogador, indice vetor: " + indice_vetor);
    //                 break;
    //             }
    //         }
    //     }

    //     // indice_a_ser_marcado corresponde a posição dentro do vetor, precisamos
    //     // identificar a qual linha, coluna ou diagonal, o índice corresponde,
    //     // então, no switch abaixo, é feita esta conversão.
    //     if (indice_a_ser_marcado !== -1) {
    //         console.log("indice_a_ser_marcado: " + indice_a_ser_marcado);
    //         switch (indice_a_ser_marcado) {
    //             // Linha.
    //             case 0: case 1: case 2: {
    //                 let linha = indice_a_ser_marcado;
    //                 for (let coluna = 0; coluna < 3; coluna++) {
    //                     if (state.tabuleiro[linha][coluna] === '') {
    //                         state.tabuleiro[linha][coluna] = 'o';
    //                         break;
    //                     }
    //                 }
    //             }
    //                 break;
    //             // Coluna:
    //             case 3: case 4: case 5: {
    //                 coluna = indice_a_ser_marcado % 3;
    //                 for (let linha = 0; linha < 3; linha++) {
    //                     if (state.tabuleiro[linha][coluna] === '') {
    //                         state.tabuleiro[linha][coluna] = 'o';
    //                         break;
    //                     }
    //                 }
    //             }
    //                 break;
    //             // Diagonal superior esquerda a diagonal inferior direita.
    //             case 6: {
    //                 for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {
    //                     if (state.tabuleiro[linha_coluna][linha_coluna] === '') {
    //                         state.tabuleiro[linha_coluna][linha_coluna] = 'o';
    //                         break;
    //                     }
    //                 }
    //             }
    //                 break;
    //             // Diagonal superior direita a diagonal inferior esquerda.
    //             case 7: {
    //                 let coluna = 2;
    //                 for (let linha = 0; linha < 3; linha++) {
    //                     if (state.tabuleiro[linha][coluna] === '') {
    //                         state.tabuleiro[linha][coluna] = 'o';
    //                         break;
    //                     }
    //                     coluna--;
    //                 }
    //             }
    //                 break;
    //         }
    //     }
    //     else {
    //         // Só iremos atribuir a tabuleiro se houver marcacoes_vazias.
    //         if (marcacoes_vazias.length > 0) {
    //             // Então, devemos escolher uma célula vazia aleatoriamente.
    //             indice_aleatorio = Math.random() * marcacoes_vazias.length;
    //             indice_aleatorio = Math.trunc(indice_aleatorio);
    //             console.log("indice_aleatorio: " + indice_aleatorio);

    //             id_celula = marcacoes_vazias[indice_aleatorio];
    //             marcacoes_vazias = marcacoes_vazias.splice(id_celula, 1);

    //             console.log('id_celula: ' + id_celula);

    //             // Obter linha e coluna.
    //             let indice_linha = Math.trunc(id_celula / 3);
    //             let indice_coluna = id_celula % 3;

    //             console.log('indice_linha: ' + indice_linha);
    //             console.log('indice_coluna: ' + indice_coluna);

    //             state.tabuleiro[indice_linha][indice_coluna] = 'o';
    //         }
    //     }

    //     state.a1 = state.tabuleiro[0][0];
    //     state.b1 = state.tabuleiro[0][1];
    //     state.c1 = state.tabuleiro[0][2];

    //     state.a2 = state.tabuleiro[1][0];
    //     state.b2 = state.tabuleiro[1][1];
    //     state.c2 = state.tabuleiro[1][2];

    //     state.a3 = state.tabuleiro[2][0];
    //     state.b3 = state.tabuleiro[2][1];
    //     state.c3 = state.tabuleiro[2][2];

    //     console.log(state.tabuleiro);

    //     this.setState(state);
    // }

    // Toda vez que for a vez do computador, este método será chamado.
    // A vez do computador será quando a vez for do 'o'.
    vez_do_computador_2() {

        // O algoritmo abaixo, indica como o computador joga contra o jogador humano..
        // Crie dois vetores: marcacoes_do_computador e marcacoes_do_jogador.
        // Tais vetores tem o comprimento igual a 8, onde, o índice 0 a 2, corresponde
        // as linhas 0 a 2 do tabuleiro; o índice 3 a 5, corresponde as colunas 0
        // a 2 do tabuleiro; o índice 6, corresponde à diagonal do canto superior esquerdo
        // até o canto inferior direito e o índice 7, corresponde à diagonal do
        // canto superior direito até o canto inferior esquerdo.
        // O vetor marcacoes_do_computador armazena a contabilização das marcações
        // do computador e o vetor marcacoes_do_jogador armazena as marcações do
        // jogador humano.

        // Percorra cada linha do tabuleiro,
        // pra cada linha a ser percorrida, contabilize:
        // a quantidade de marcações do computador,
        // a quantidade de marcações do jogador humano.
        // Armazene a contabilização de marcações do computador no vetor
        // marcacoes_do_computador na posição do índice que corresponde a esta linha
        // conforme descrito acima.
        // O mesmo pra as marcacoes_do_jogador, no vetor 'marcacoes_do_jogador'.

        // Faça o mesmo procedimento pra as colunas do tabuleiro
        // e em seguida, pra as duas diagonais do tabuleiro.

        // Abaixo, há o layout onde deve ser armazenado a contabilização:
        // Observe que, a interseção de linha e coluna é representado desta
        // forma: [x,y], onde x representa a linha e y a coluna, desta forma
        // fica fácil identificar em quql posição do vetor deve ser armazenada
        // a contabilização.
        // [  TABULEIRO  ]      [VETOR]
        // [0,0][0,1][0,2]      [0]
        // [1,0][1,1][1,2]      [1]
        // [2,0][2,1][2,2]      [2]
        //
        // [ 3] [ 4 ][ 5 ] <<< [VETOR]

        // O computador deve fazer verificações pra identificar qual a melhor
        // posição pra jogar impedindo que o jogador ganhe, isto é bem simples,
        // Após, percorrer linhas, colunas e as duas diagonais, o computador
        // irá verificar se ao marcar uma célula vazia ele poderá ou não,
        // se não puder ganhar, o computador deverá verificar as marcações
        // do jogador e marcar a célula vazia pra impedir que o jogador ganhe
        // na próxima jogada.
        // Isto é bem simples, primeiro iremos percorrer, todo os vetores
        // procurando contabilizações desta forma nos dois vetores na mesma
        // posição do índice desta forma:
        // qt_marcacoes_do_computador = 2 and qt_marcacoes_do_computador = 0,
        // Isto, indica que duas marcações foram feitas em uma linha, coluna ou diagonal
        // e há uma célula vazia. Neste caso, iremos marcar a célula vazia e o computador
        // vence.
        // Se não há marcações que indica que o computador irá ganhar, devemos,
        // procurar as marcações desta forma:
        // qt_marcacoes_do_jogador = 2 and qt_marcacoes_do_computador = 0
        // Se houver, devemos marcar a célula vazia e retornar da função.

        let marcacoes_do_jogador = new Array(8);
        let marcacoes_do_computador = new Array(8);

        // Cada célula terá um índice, então, podemos sortear uma célula vazia
        let marcacoes_vazias = [];

        // Da esquerda pra direita e de cima pra baixo, haverá um identificador
        // único e exclusivo pra cada célula do tabuleiro.
        let id_celula = -1;

        // No loop abaixo, iremos percorrer cada linha e contabiliza a quantidade
        // de marcações realizadas pelo computador e pelo jogador humano.
        // Nos vetores, marcacoes_do_computador e marcacoes_do_jogador, os índices
        // 0 a 2, corresponde às linhas 0 a 2 do tabuleiro.
        let indice_marcacoes = 0;
        for (let linha = 0; linha < 3; linha++) {
            let qt_marcacoes_do_jogador = 0;
            let qt_marcacoes_do_computador = 0;

            for (let coluna = 0; coluna < 3; coluna++) {
                // Podemos obter o identificador de qualquer célula através da fórmula abaixo.
                id_celula = 3 * linha + coluna;

                if (this.state.tabuleiro[linha][coluna] === 'x') {
                    qt_marcacoes_do_jogador++;
                }
                else if (this.state.tabuleiro[linha][coluna] === 'o') {
                    qt_marcacoes_do_computador++;
                }
                else if (this.state.tabuleiro[linha][coluna] === '') {
                    marcacoes_vazias.push(id_celula);
                }
            }

            // Armazena as marcações da linha atual.
            marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
            marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;
            indice_marcacoes++;
        }

        // No loop abaixo, iremos percorrer cada coluna e contabiliza a quantidade
        // de marcações realizadas pelo computador e pelo jogador humano.
        // Nos vetores, marcacoes_do_computador e marcacoes_do_jogador, os índices
        // 3, 4 e 5, corresponde às colunas 0, 1 e 2 do tabuleiro.
        for (let coluna = 0; coluna < 3; coluna++) {
            let qt_marcacoes_do_jogador = 0;
            let qt_marcacoes_do_computador = 0;

            for (let linha = 0; linha < 3; linha++) {

                if (this.state.tabuleiro[linha][coluna] === 'x') {
                    qt_marcacoes_do_jogador++;
                } else if (this.state.tabuleiro[linha][coluna] === 'o') {
                    qt_marcacoes_do_computador++;
                } else if (this.state.tabuleiro[linha][coluna] === '') {
                    // Observe que ao analisar linha e coluna, uma linha
                    // é composta de colunas e uma coluna é composta de linhas
                    // então pode acontecer do id da célula se repetir, devemos
                    // evitar incluir o mesmo id duas vezes.
                    id_celula = 3 * linha + coluna;
                    if (marcacoes_vazias.includes(id_celula) === false) {
                        marcacoes_vazias.push(id_celula);
                    }
                }
            }

            marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
            marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;
            indice_marcacoes++;
        }

        // Verifica a diagonal superior esquerda a direita inferior direita.
        let qt_marcacoes_do_jogador = 0;
        let qt_marcacoes_do_computador = 0;
        marcacoes_do_computador[indice_marcacoes] = 0;
        marcacoes_do_jogador[indice_marcacoes] = 0;

        id_celula = 0;
        for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {

            if (this.state.tabuleiro[linha_coluna][linha_coluna] === 'x') {
                qt_marcacoes_do_jogador++;
            } else if (this.state.tabuleiro[linha_coluna][linha_coluna] === 'o') {
                qt_marcacoes_do_computador++;
            } else if (this.state.tabuleiro[linha_coluna][linha_coluna] === '') {
                // Observe que ao analisar linha e coluna, uma linha
                // é composta de colunas e uma coluna é composta de linhas
                // então pode acontecer do id da célula se repetir, devemos
                // evitar isto.
                id_celula = 3 * linha_coluna + linha_coluna;
                if (marcacoes_vazias.includes(id_celula) === false) {
                    marcacoes_vazias.push(id_celula);
                }
            }
        }

        marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
        marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;

        indice_marcacoes++;
        marcacoes_do_computador[indice_marcacoes] = 0;
        marcacoes_do_jogador[indice_marcacoes] = 0;

        qt_marcacoes_do_computador = 0;
        qt_marcacoes_do_jogador = 0;

        // Verifica diagonal superior direita a inferior esquerda.
        coluna = 2;
        for (let linha = 0; linha < 3; linha++) {
            if (this.state.tabuleiro[linha][coluna] === 'x') {
                qt_marcacoes_do_jogador++;
            } else if (this.state.tabuleiro[linha][coluna] === 'o') {
                qt_marcacoes_do_computador++;
            } else if (this.state.tabuleiro[linha][coluna] === '') {
                // Observe que ao analisar linha e coluna, uma linha
                // é composta de colunas e uma coluna é composta de linhas
                // então pode acontecer do id da célula se repetir, devemos
                // evitar isto.
                id_celula = 3 * linha + coluna;
                if (marcacoes_vazias.includes(id_celula) === false) {
                    marcacoes_vazias.push(id_celula);
                }
            }

            // Iremos do canto superior direito pra o canto inferior esquerdo.
            // Então, iremos começar da maior coluna e ir diminuindo até chegar
            // a zero.
            coluna--;
        }

        marcacoes_do_computador[indice_marcacoes] = qt_marcacoes_do_computador;
        marcacoes_do_jogador[indice_marcacoes] = qt_marcacoes_do_jogador;

        console.log("marcacoes vazias:");
        console.log(marcacoes_vazias);

        console.log("marcacoes_do_computador:");
        console.log(marcacoes_do_computador);

        // Aqui, está a inteligência artificial do jogo.
        // Nos fors anteriores, contabilizamos a quantidade de marcações
        // do computador e do jogador humano, por linha, coluna e as duas diagonais.
        // Na jogo da velha, é um tabuleiro 3 por 3, então, pra o computador
        // ganhar ele deve ter 3 marcações na mesma linha, na mesma coluna ou na
        // mesma diagonal, entretanto, pra isto ser possível, a cada jogada, ele
        // deve verificar se há pelo menos duas marcações do computador em uma
        // mesma linha, mesma coluna ou diagonal, se sim, o computador deve
        // marcar a célula vazia pra vencer o jogo, entretanto, se não é possível
        // ganhar ainda, o computador então deve verificar as marcações do jogador
        // humano e evitar que o jogador humano vença quando for a vez dele,
        // então, o computador deve verificar se em uma mesma coluna, linha ou diagonal
        // há duas marcações do jogador se sim, ele deve marcar a célula vazia desta
        // linha pra evitar que o jogador marque a mesma quando a vez for passada
        // pra ele.

        // Há dois vetores: marcacoes_do_jogador e marcacoes_do_jogador.
        // Tais vetores tem um tamanho de 8 células, cada índice deste vetor
        // corresponde a uma linha, coluna ou diagonal do tabuleiro, que armazena
        // a contabilização das marcações.

        // No primeiro for, o computador verifica se há alguma linha, coluna ou diagonal
        // que garanta que ao marcar a célula vazia que falta garanta a vitória do computador.
        // Se não houver, tentaremos impedir que na vez do jogador humano, ele consiga
        // obter a vitória.
        let indice_a_ser_marcado = -1;
        for (let indice_vetor = 0; indice_vetor < 8; indice_vetor++) {
            if (marcacoes_do_computador[indice_vetor] === 2 && marcacoes_do_jogador[indice_vetor] === 0) {
                indice_a_ser_marcado = indice_vetor;
                break;
            }

        }

        // Só iremos analisar as jogadas do jogador, se o computador não pode
        // ganhar na vez dele, então, tentar impedir a vitória do jogador humano.
        if (indice_a_ser_marcado === -1) {
            for (let indice_vetor = 0; indice_vetor < 8; indice_vetor++) {
                if (marcacoes_do_jogador[indice_vetor] === 2 && marcacoes_do_computador[indice_vetor] === 0) {
                    indice_a_ser_marcado = indice_vetor;
                    break;
                }
            }
        }

        // indice_a_ser_marcado corresponde a posição dentro do vetor, precisamos
        // identificar a qual linha, coluna ou diagonal, o índice corresponde,
        // então, no switch abaixo, é feita esta conversão.
        if (indice_a_ser_marcado !== -1) {
            console.log("indice_a_ser_marcado: " + indice_a_ser_marcado);
            switch (indice_a_ser_marcado) {
                // Linha.
                case 0: case 1: case 2: {
                    let linha = indice_a_ser_marcado;
                    for (let coluna = 0; coluna < 3; coluna++) {
                        if (this.state.tabuleiro[linha][coluna] === '') {
                            this.state.tabuleiro[linha][coluna] = 'o';
                            break;
                        }
                    }
                }
                    break;
                // Coluna:
                case 3: case 4: case 5: {
                    coluna = indice_a_ser_marcado % 3;
                    for (let linha = 0; linha < 3; linha++) {
                        if (this.state.tabuleiro[linha][coluna] === '') {
                            this.state.tabuleiro[linha][coluna] = 'o';
                            break;
                        }
                    }
                }
                    break;
                // Diagonal superior esquerda a diagonal inferior direita.
                case 6: {
                    for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {
                        if (this.state.tabuleiro[linha_coluna][linha_coluna] === '') {
                            this.state.tabuleiro[linha_coluna][linha_coluna] = 'o';
                            break;
                        }
                    }
                }
                    break;
                // Diagonal superior direita a diagonal inferior esquerda.
                case 7: {
                    let coluna = 2;
                    for (let linha = 0; linha < 3; linha++) {
                        if (this.state.tabuleiro[linha][coluna] === '') {
                            this.state.tabuleiro[linha][coluna] = 'o';
                            break;
                        }
                        coluna--;
                    }
                }
                    break;
            }
        }
        else {
            // Só iremos atribuir a tabuleiro se houver marcacoes_vazias.
            if (marcacoes_vazias.length > 0) {
                // Então, devemos escolher uma célula vazia aleatoriamente.
                indice_aleatorio = Math.random() * marcacoes_vazias.length;
                indice_aleatorio = Math.trunc(indice_aleatorio);
                console.log("indice_aleatorio: " + indice_aleatorio);

                id_celula = marcacoes_vazias[indice_aleatorio];
                marcacoes_vazias = marcacoes_vazias.splice(id_celula, 1);

                console.log('id_celula: ' + id_celula);

                // Obter linha e coluna.
                let indice_linha = Math.trunc(id_celula / 3);
                let indice_coluna = id_celula % 3;

                console.log('indice_linha: ' + indice_linha);
                console.log('indice_coluna: ' + indice_coluna);

                this.state.tabuleiro[indice_linha][indice_coluna] = 'o';
            }
        }

        // Atualiza pra aparecer na tela.
        this.setState(this.state);
    }

    // resetar() {
    //     let state = this.state;
    //
    //     state.ganhador = '';
    //     state.status = 1;
    //     state.aviso = '';
    //     state.empate = 'nao';
    //     state.vez = 'x';
    //     state.a1 = '';
    //     state.a2 = '';
    //     state.a3 = '';
    //     state.b1 = '';
    //     state.b2 = '';
    //     state.b3 = '';
    //     state.c1 = '';
    //     state.c2 = '';
    //     state.c3 = '';
    //
    //     this.setState(state);
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.area}>
                    <View style={[styles.velhaVertical, { borderLeftWidth: 0 }]}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                //this.clicou('a1');
                                this.clicou_na_celula(0);

                            }} style={[styles.velhaHorizontal, { borderTopWidth: 0 }]}>
                            <View>
                                {this.state.tabuleiro[0][0] === 'x' && <X />}
                                {this.state.tabuleiro[0][0] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"

                            onPress={() => {
                                this.clicou_na_celula(3);
                            }}
                            style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[1][0] === 'x' && <X />}
                                {this.state.tabuleiro[1][0] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(6);
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[2][0] === 'x' && <X />}
                                {this.state.tabuleiro[2][0] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.velhaVertical}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(1);
                            }} style={[styles.velhaHorizontal, { borderTopWidth: 0 }]}>
                            <View>
                                {this.state.tabuleiro[0][1] === 'x' && <X />}
                                {this.state.tabuleiro[0][1] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(4);
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[1][1] === 'x' && <X />}
                                {this.state.tabuleiro[1][1] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(7);
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[2][1] === 'x' && <X />}
                                {this.state.tabuleiro[2][1] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.velhaVertical}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(2);
                            }} style={[styles.velhaHorizontal, { borderTopWidth: 0 }]}>
                            <View>
                                {this.state.tabuleiro[0][2] === 'x' && <X />}
                                {this.state.tabuleiro[0][2] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(5);
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[1][2] === 'x' && <X />}
                                {this.state.tabuleiro[1][2] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou_na_celula(8);
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.tabuleiro[2][2] === 'x' && <X />}
                                {this.state.tabuleiro[2][2] === 'o' && <O />}
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.infoArea}>
                    <View style={styles.infoVez}>
                        <Text>Vez de:</Text>
                        {this.state.vez === 'x' && <X />}
                        {this.state.vez === 'o' && <O />}
                    </View>
                    <View style={styles.infoAviso}>
                        {this.state.ganhador === 'x' && <X />}
                        {this.state.ganhador === 'o' && <O />}
                        {this.state.ganhador !== '' && <Text>GANHOU</Text>}
                        {this.state.empate === 'sim' && <Text>** EMPATE **</Text>}
                    </View>
                </View>

                <View style={styles.reset_button} >
                    <Button title="Resetar" onPress={() => {
                        //this.resetar();
                        this.resetar_tabuleiro();
                    }} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    area: {
        width: 300,
        height: 300,
        flexDirection: 'row',
    },
    velhaVertical: {
        flex: 1,
        borderLeftWidth: 5,
        borderLeftColor: '#000',
    },
    velhaHorizontal: {
        flex: 1,
        borderTopWidth: 5,
        borderTopColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoArea: {
        marginTop: 30,
        flexDirection: 'row',
    },
    infoVez: {
        width: 90,
        height: 90,
        backgroundColor:
            '#cccccc',
        justifyContent:
            'center',
        alignItems:
            'center',
    },
    infoAviso: {
        flex: 1,
        backgroundColor:
            '#eee',
        justifyContent:
            'center',
        alignItems:
            'center',
    },
    reset_button: {
        marginTop: 10,
    }

})
    ;
