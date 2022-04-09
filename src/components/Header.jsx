import React from 'react';
import Prompt from './Prompt';
import { useState } from "react";

const Header = ({id}) => {
    
    // {
    //     id: 1,
    //     text: "SHOP 'TIL YOU DROP",
    //     color: '#37a5e4',
    //   },
    //   {
    //     id: 2,
    //     text: "PRICE",
    //     color: '#37a5e4',
    //   },
    //   {
    //     id: 3,
    //     text: 'DISCOUNTS',
    //     color: '#51b667',
    //   },
    //   {
    //     id: 4,
    //     text: "TOTAL",
    //     color: '#37a5e4',
    //   }

    return (
        <>
        {id === 0 &&
            <header>
                <h1  className='header' style={{color:'#37a5e4'}}>SHOP 'TIL YOU DROP</h1>
            </header>  
        }
        {id === 1 &&
            <header>
                <h1  className='header' style={{color:'#37a5e4'}}>PRICE</h1>
            </header>  
        }
        {id === 2 &&
            <header>
                <h1  className='header' style={{color:'#51b667'}}>DISCOUNTS</h1>
            </header>  
        }
        {id === 3 &&
            <header>
                <h1  className='header' style={{color:'#37a5e4'}}>TOTAL</h1>
            </header>  
        }

        </>

    )
}

export default Header
