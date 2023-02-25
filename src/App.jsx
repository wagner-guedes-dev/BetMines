import { useState, useEffect, useMemo } from "react";


import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

import { BsFillCalculatorFill, BsCircleFill, BsStarFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { FaCoins, FaBomb } from 'react-icons/fa';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import data from './data/odds';

import './App.css'

const oddsData = data;

function Home() {
    
    const [user, setUser] = useState({});
    const [mines, setMines] = useState(1)
    const [flip, setFlip] = useState(Array(25).fill(false));
    const [sort, setSort] = useState(14)
    const [disbleButtonAndSelect, setDisbleButtonAndSelect] = useState(false);
    const [money, setMoney] = useState(175);
    const [limit, setLimit] = useState(oddsData[mines - 1].length);
    const [odd, setOdd] = useState(0);
    const [numberClick, setNumberClick] = useState(1);
    const [cashoutEnable, setCashoutEnable] = useState(false)
    const [bet, setBet] = useState(parseFloat(0).toFixed(2));
    const [gain, setGain] = useState(0);
    const [btnCashout, setBtnCashout] = useState(true);
    const [handleModal, setHandleModal] = useState(false);
    const [cardClickLimit, setCardClickLimit] = useState(0)
    const [bomb, setBomb] = useState(Array(25).fill(false));
    const [star, setStar] = useState(Array(25).fill(false));
    const [circle, setCircle] = useState(Array(25).fill(true));
    const [verific, setVerific] = useState(Array(25).fill(true));
    
    const listItems = [];

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-35%',
        padding: '0px',
        transform: 'translate(-50%, -50%)',
        },
    }; 

    for (let i = 0; i < 25; i++) {
    listItems.push(
        <div id={i} key={i} 
        onClick={() => {
            setCardClickLimit(cardClickLimit + 1) //limite de clicks no card
            if(cardClickLimit < limit){
                if(verific[i]){
                    verific[i] = false
                    if(disbleButtonAndSelect){
                        circle[i] = false
                        console.log(verific)
                        if(flip[i]){
                            star[i] = true
                        }else{
                            bomb[i] = true
                            
                        }
                        //state limit é a quantidade de clicks por mines no selcted
                        if (cashoutEnable) {
                            cardClick(numberClick)
                            flip[i] = true
                            setBtnCashout(false)
                                }
                            } 
                }
            }
            
            
        }
        
        } 
        // className={`card ${flip[i] ? 'flipCard' : ''} ${disbleButtonAndSelect ? '' : 'disabled'}`}> {flip[i] ? <BsStarFill className="star"/> : <BsCircleFill className="circle"/> } </div>
        className={`card ${bomb[i] ? 'flipCard' : ''} ${star[i] ? 'flipCard' : ''} ${disbleButtonAndSelect ? '' : 'disabled'}`}>
            
            {bomb[i] ? <FaBomb className={`star`} /> : null}

            {star[i] ? <BsStarFill className={`star`}/> : null}

            {circle[i] ? <BsCircleFill className="circle "/> :  null}
        </div>
    );
    }

   
    
    
    useEffect(()=>{
        setDisbleButtonAndSelect(false)
        switch (mines){
            case 1:
                setSort(14)
            break 
            case 2:
                setSort(13)
            break 
            case 3:
                setSort(13)
            break 
            case 4:
                setSort(12)
            break 
            case 5:
                setSort(12)
            break 
            case 6:
                setSort(11)
            break 
            case 7:
                setSort(10)
            break 
            case 8:
                setSort(10)
            break 
            case 9:
                setSort(9)
            break 
            case 10:
                setSort(9)
            break 
            case 11:
                setSort(8)
            break 
            case 12:
                setSort(7)
            break 
            case 13:
                setSort(7)
            break 
            case 14:
                setSort(6)
            break 
            case 15:
                setSort(6)
            break 
            case 16:
                setSort(5)
            break 
            case 17:
                setSort(4)
            break 
            case 18:
                setSort(4)
            break 
            case 19:
                setSort(3)
            break 
            case 20:
                setSort(3)
            break 
        }

        setLimit(oddsData[mines - 1].length)
    },[mines])

    const minesSelected = (event) => {
        setMines(parseInt(event.target.value));
        setFlip(flip.map(() => false));
    };
    
    const random = ()=>{
        //primeiro vamos colocar itens falses no array
        for(let i = 0; i < sort; i++){
            flip[i] = true
        }
        //segundo embaralhamos elas
        flip.sort(() => Math.random() - 0.5);
        //as que ficarem false serao estrelas
        //as que ficaram true serao bombas
        console.log(flip)
    }
    

    const handleMines = () => {
        setCashoutEnable(true);
    }

    const cardClick = (position) => {
        if (cashoutEnable && (position <= limit)) {
            let filtered = oddsData[mines -1].filter((i) => {
                return i.id == position
            })
            setOdd(filtered[0].value);
            setNumberClick(numberClick + 1);
        }
        
    }

    const cashout = () => {
        if (odd !== 0) {
            const newMoney = odd * bet;
            let moneyFormatted = newMoney.toFixed(2);
            setGain(moneyFormatted);
            setTimeout(() => {
                setHandleModal(true);
                setNumberClick(1)    
            }, 1000);
            
            setOdd(0);
        }
    }
    
    const carousel = (
         <Carousel
         className="carousel"
         swipeable={false}
         centerMode={true}
         showStatus={false}
         showThumbs={false}
         renderIndicator={false}
         centerSlidePercentage={30}
         renderArrowPrev={(clickHandler, hasPrev) => {
             return (
               <div
                 className="arrowLeft"
                 onClick={clickHandler}
               >
                 <IoIosArrowBack size={30} />
               </div>
             );
           }}
           renderArrowNext={(clickHandler, hasNext) => {
             return (
               <div
               className="arrowRight"
                 onClick={clickHandler}
               >
                 <IoIosArrowForward size={30} />
               </div>
             );
           }}
         >
             {
                 oddsData[mines -1].map((item, index) => {
                     return (
                     <div className="carouselItem" id={item.id} key={item.id}>  
                         <span className="value">{item.value}</span>
                         <span className="hits">{item.id} hits</span>
                     </div>
                     )
                 })
             }

     </Carousel>
     )

    return (
        <>
            <div className="App">
                <Modal
                    isOpen={handleModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <div className="modalWrapper">
                        <h2>Deu Green ✅ </h2>
                        <p>Você ganhou BRL {gain}</p>
                        <button className="btnGreen" onClick={() => {
                            setHandleModal(false)
                            setFlip(Array(25).fill(false))
                            setDisbleButtonAndSelect(false)
                        }}>Continuar jogando</button>
                    </div>
                </Modal>
                {/* COMEÇAR AQUI */}
                <header>
                    <img src="https://www.quintoquartobr.com/wp-content/uploads/2022/07/f12bet_logo-300x75.png" width={150}/>

                    <div className="balanceWrapper">
                        <span>Saldo: </span>
                        <span className="balance"> BRL {money.toFixed(2)}</span> 
                    </div>                   
                </header>
                <main>
                    <div>
                        <div>   
                            <select id="selectNumero" value={mines} onChange={minesSelected} className={`select ${disbleButtonAndSelect ? 'disabled' : null}`} disabled={disbleButtonAndSelect}>
                                <option value="1">Mines: 1</option>
                                <option value="2">Mines: 2</option>
                                <option value="3">Mines: 3</option>
                                <option value="4">Mines: 4</option>
                                <option value="5">Mines: 5</option>
                                <option value="6">Mines: 6</option>
                                <option value="7">Mines: 7</option>
                                <option value="8">Mines: 8</option>
                                <option value="9">Mines: 9</option>
                                <option value="10">Mines: 10</option>
                                <option value="11">Mines: 11</option>
                                <option value="12">Mines: 12</option>
                                <option value="13">Mines: 13</option>
                                <option value="14">Mines: 14</option>
                                <option value="15">Mines: 15</option>
                                <option value="16">Mines: 16</option>
                                <option value="17">Mines: 17</option>
                                <option value="18">Mines: 18</option>
                                <option value="19">Mines: 19</option>
                                <option value="20">Mines: 20</option>
                            </select>
                        </div>
                        <div className="area-mines">
                          {listItems}
                        </div>
                        </div>
                </main>
            </div>

            <footer>
                <div className="containerFooter">
                     {carousel}
                     <div className="wrapperBet">
                        <div className="betValue ">
                            <input
                            value={bet}
                            type='number'
                            disabled={disbleButtonAndSelect}
                            className={disbleButtonAndSelect ? 'disabled' : ''}
                            onChange={(e)=>{
                                setBet(parseFloat(e.target.value))}}
                            />
                        
                            <button 
                            disabled={disbleButtonAndSelect}
                            className={disbleButtonAndSelect ? 'disabled' : ''}
                            onClick={()=>{
                                // verificação caso o valor seja NuN
                                    if(isNaN(bet)){
                                        setBet(0)
                                    }else{
                                        const newBet = parseFloat(bet) + 10;
                                        setBet(newBet.toFixed(2))

                                    }
                                }
                            }>+</button>

                            <FaCoins className={disbleButtonAndSelect ? 'disabled' : ''}/>

                            <button 
                            className={disbleButtonAndSelect ? 'disabled' : ''}
                            disabled={disbleButtonAndSelect}
                            onClick={()=>{
                                // verificação caso o valor seja NuN
                                if(isNaN(bet)){
                                    setBet(0)
                                }else{
                                    if(bet >= 10){
                                        const newBet = parseFloat(bet) - 10;
                                        setBet(newBet.toFixed(2))
                                    }else{
                                        if(bet > 0){
                                            const newBet = parseFloat(bet) - 1;
                                            setBet(newBet.toFixed(2))
                                            }
                                        }
                                    }
                                }
                                
                            }>-</button>
                        </div>
                        <div className="actionFooter">
                            <div className="betValueContainer">
                                {
                                    cashoutEnable ? 
                                    <button className={`btnRed ${btnCashout ? 'disabled' : ''} `}
                                    disabled={btnCashout} 
                                    onClick={() => {
                                        cashout()
                                        setMoney(bet * odd + money)
                                        setCashoutEnable(false)
                                        setBet(parseFloat(parseFloat(0).toFixed(2)))
                                        setCardClickLimit(0)
                                        //zerando os cards
                                        setStar(Array(25).fill(false))
                                        setBomb(Array(25).fill(false))
                                        setCircle(Array(25).fill(true))
                                        setVerific(Array(25).fill(true))
                                        }
                                    } 
                                    >
                                        {`Cashout ${odd}x`}
                                    </button> 
                                    :
                                    <button className={`btnGreen ${bet != 0 && bet <= money ? '' : 'disabled'}`} onClick={() => {
                                        // verificar se o valor do bet é diferente de 0 e se é menor que o valor da carteira
                                        if(bet != 0 && bet <= money){
                                            handleMines()
                                            setDisbleButtonAndSelect(true)
                                            random()
                                        }
                                        
                                        }}>
                                        <BsFillCalculatorFill/> Bet
                                    </button>
                                }
                            </div>
                        </div>
                     </div>
                </div>
            </footer>
            
            <Toaster />  
        </>
    );
}

export default Home;