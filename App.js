import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, TouchableHighlight, Button} from 'react-native';
import {X} from './src/x';
import {O} from './src/o';

export default class JogoDaVelha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empate: '',
            ganhador: '',
            status : 1,
            aviso: '',
            vez: 'x',
            a1: '',
            a2: '',
            a3: '',
            b1: '',
            b2: '',
            b3: '',
            c1: '',
            c2: '',
            c3: '',
            tabuleiro: [,]
        };


    }

    clicou(p) {
        let state = this.state;

        if (eval('state.' + p) === '' && state.status === 1 ) {
            eval('state.' + p + '= state.vez'
            );

            if (state.vez === 'x') {
                state.vez = 'o';
            } else {
                state.vez = 'x';
            }
        }

        this.setState(state);

        this.verificar('x');
        this.verificar('o');
    }

    verificar(item) {
        let state = this.state;

        // Horizontalmente.
        if ((state.a1 === item && state.b1 === item && state.c1 === item) ||
            (state.a2 === item && state.b2 === item && state.c2 === item) ||
            (state.a3 === item && state.b3 === item && state.c3 === item) ||
            (state.a1 === item && state.a2 === item && state.a3 === item) ||
            (state.b1 === item && state.b2 === item && state.b3 === item) ||
            (state.c1 === item && state.c2 === item && state.c3 === item) ||
            (state.a1 === item && state.b2 === item && state.c3 === item) ||
            (state.c3 === item && state.b2 === item && state.a1 === item)
        ) {
            state.aviso = item + ' ganhou.';
            state.status = 0;
            state.ganhador = item;
        }

        if(state.status === 1){
            if( state.a1 !== '' && state.a2 !== '' && state.a3 !== '' &&
                state.b1 !== '' && state.b2 !== '' && state.b3 !== '' &&
                state.c1 !== '' && state.c2 !== '' && state.c3 !== ''){
                state.aviso = '** EMPATE **';
                state.status = 0;
            }
        }

        this.setState(state);
    }

    resetar() {
        let state = this.state;

        state.ganhador = '';
        state.status = 1;
        state.aviso = '';
        state.empate = '';
        state.vez = 'x';
        state.a1 = '';
        state.a2 = '';
        state.a3 = '';
        state.b1 = '';
        state.b2 = '';
        state.b3 = '';
        state.c1 = '';
        state.c2 = '';
        state.c3 = '';

        this.setState(state);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.area}>
                    <View style={[styles.velhaVertical, {borderLeftWidth: 0}]}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('a1')
                            }} style={[styles.velhaHorizontal, {borderTopWidth: 0}]}>
                            <View>
                                {this.state.a1 === 'x' && <X/>}
                                {this.state.a1 === 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('a2')
                            }}
                            style={styles.velhaHorizontal}>
                            <View>
                                {this.state.a2 === 'x' && <X/>}
                                {this.state.a2 === 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('a3')
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.a3 === 'x' && <X/>}
                                {this.state.a3 === 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.velhaVertical}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('b1')
                            }} style={[styles.velhaHorizontal, {borderTopWidth: 0}]}>
                            <View>
                                {this.state.b1 == 'x' && <X/>}
                                {this.state.b1 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('b2')
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.b2 == 'x' && <X/>}
                                {this.state.b2 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('b3')
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.b3 == 'x' && <X/>}
                                {this.state.b3 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.velhaVertical}>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('c1')
                            }} style={[styles.velhaHorizontal, {borderTopWidth: 0}]}>
                            <View>
                                {this.state.c1 == 'x' && <X/>}
                                {this.state.c1 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('c2')
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.c2 == 'x' && <X/>}
                                {this.state.c2 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#eeeeee"
                            onPress={() => {
                                this.clicou('c3')
                            }} style={styles.velhaHorizontal}>
                            <View>
                                {this.state.c3 == 'x' && <X/>}
                                {this.state.c3 == 'o' && <O/>}
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.infoArea}>
                    <View style={styles.infoVez}>
                        <Text>Vez de:</Text>
                        {this.state.vez === 'x' && <X/>}
                        {this.state.vez === 'o' && <O/>}
                    </View>
                    <View style={styles.infoAviso}>
                        {this.state.ganhador === 'x' && <X/>}
                        {this.state.ganhador === 'o' && <O/>}
                        {this.state.ganhador !== '' && <Text>GANHOU</Text> }
                        {this.state.empate !== '' && <Text>** EMPATE **</Text>}
                    </View>
                </View>

                <View style={styles.reset_button} >
                    <Button title="Resetar" onPress={() => {
                        this.resetar()
                    }}/>
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
            marginTop:10,
        }

    })
;
