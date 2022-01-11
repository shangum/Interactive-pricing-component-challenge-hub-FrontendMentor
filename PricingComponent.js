import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Slider, {SliderThumb} from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import IconSliderThumb from '../assets/images/icon-slider.svg';



const PriceSlider = styled(Slider)(({ theme }) => ({    
    color: 'hsl(174, 86%, 45%)',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {    
      height: 37,
      width: 37,      
      backgroundColor: 'hsl(174, 86%, 45%)',
      border: '1px solid currentColor',
      '&:hover': {
        /*boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',*/
        boxShadow: '0 10px 15px 4px rgba(16, 213, 194, 0.46)',        
      },
      '&:active' : {        
        backgroundColor: 'hsl(174, 86%, 40%)',      
        /*boxShadow: '0 5px 10px 4px rgba(16, 213, 194, 0.46)',  */
        boxShadow: '0 10px 15px 4px rgba(16, 213, 194, 0.46)',
      },
      '&:focus' : {        
        backgroundColor: 'hsl(174, 86%, 40%)',      
        /*boxShadow: '0 5px 10px 4px rgba(16, 213, 194, 0.46)',  */
        boxShadow: '0 10px 15px 4px rgba(16, 213, 194, 0.46)',
      },
      '& .MuiSlider-dragging' : {
        boxShadow: '0 10px 15px 4px rgba(16, 213, 194, 0.46)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {      
      height: 6,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,      
      height: 6,
    },    
  }));
  
  function CustomThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>        
        {children}
        <img src={IconSliderThumb} />
      </SliderThumb>
    );
  }
  
  CustomThumbComponent.propTypes = {
    children: PropTypes.node,
  };

  const YearMonthSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({    
    width: 38,
    height: 21,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,      
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {          
          backgroundColor: theme.palette.mode === 'dark' ? 'hsl(174, 86%, 45%)' : 'hsl(174, 86%, 45%)',          
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',    
         width: 18,
         height: 18,
    },
    '& .MuiSwitch-track': {      
      borderRadius: 21 / 2,      
      backgroundColor: theme.palette.mode === 'light' ? 'hsl(223, 50%, 87%)' : 'hsl(223, 50%, 87%)',      
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));  

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });



function PricingComponent()
{    


    const priceSlider = useRef(null);
    const cbMonthOrYear = useRef(null);     
    const cbMonthOrYearOLD = useRef(null);
    const [checked, setChecked] = useState(false);
    //cbMonthOrYearOLD
    const [pageViewsValue, setPageViewsValue] = useState('100K ');
    const [priceSliderValue, setPriceSliderValue] = useState(3);
    const [dollarAmount, setDollarAmount] = useState(formatter.format(16));


    const onChange_PriceSlider = (e) => {

    
        let sliderValue = e.target.value; 
        setPriceSliderValue(sliderValue);                        
        let bYearly = checked;
        
        /*console.log(`slider changed .. sliderValue: ${sliderValue}`); */
           
        updateComponentValues(sliderValue, bYearly);
    
      };

      const onChange_cbMonthOrYearOLD = (e) => {

        let bYearly = cbMonthOrYear.current.checked;
        let sliderValue = priceSliderValue;
        
        updateComponentValues(sliderValue, bYearly);

      };

      const onChange_cbMonthOrYear = (e) => {
        
        let bYearly = e.target.checked;
        setChecked(bYearly);
        let sliderValue = priceSliderValue;
        
        updateComponentValues(sliderValue, bYearly);

      };

      const updateComponentValues = (sliderValue, bYearly) => 
      {
            /*console.log(`updateComponentValues(..) sliderValue: ${sliderValue} bYearly: ${bYearly}`);*/

            let pageViewOutputValue = '';
            let monthlyPrice = 0.0;
             /*
              - 10K pageviews / $8 per month
              - 50K pageviews / $12 per month
              - 100K pageviews / $16 per month
              - 500k pageviews / $24 per month
              - 1M pageviews / $36 per month
      
              If the visitor switches the toggle to yearly billing, a 25% discount should be applied to all prices.            
            */

            switch(sliderValue)
            {
                case 1:
                    pageViewOutputValue = '10K ';
                    monthlyPrice = 8.0;
                break;
                case 2:
                    pageViewOutputValue = '50K ';
                    monthlyPrice = 12.0;
                break;
                case 3:
                    pageViewOutputValue = '100K ';
                    monthlyPrice = 16.0;
                break;
                case 4:
                    pageViewOutputValue = '500K '
                    monthlyPrice = 24.0;
                break;
                case 5:
                    pageViewOutputValue = '1M ';
                    monthlyPrice = 36.0;
                break;
            }

            if(bYearly)
            {
                monthlyPrice *= 0.25;
            }
            
            /*console.dir(checked); */
            /*console.dir(priceSlider.current);*/
            setPageViewsValue(pageViewOutputValue);
            setDollarAmount(formatter.format(monthlyPrice));                        
      }

    return (
        <div
        className="pricing-component-body"
        >            

            <div className="pricing-component-mini-grid">
                <div className="cell-pageviews"><span id="page-views">{pageViewsValue}</span>Pageviews</div>                
                <div className="cell-dollar-month"><span id="dollar-amount">{dollarAmount}</span> <span className="month-span">/ month</span></div>
                <div className="cell-price-slider">                    
                    <PriceSlider
                        id="price-slider"
                        name="price-slider"
                        ref={priceSlider}
                        components={{ Thumb: CustomThumbComponent }}                        
                        defaultValue={3}
                        min={1}
                        max={5}                                        
                        onChange={onChange_PriceSlider}                        
                    />                    
                </div>
            </div>
            <div>
                <div className="billing-container">
                    <div className="billing monthly-billing">Monthly Billing </div>                   
                    <YearMonthSwitch sx={{ m: 1 }} checked={checked} onChange={onChange_cbMonthOrYear} />
                    <div className="billing yearly-billing">Yearly Billing</div>
                    <span className="discount">25% <span className="discount-text">discount</span></span>
                </div>

                <hr />

                <div className="pricing-footer-grid">
                    <div className="cell-features">
                        <ul className="features">
                            <li>Unlimited websites</li>
                            <li>100% data ownership</li>
                            <li>Email reports</li>
                        </ul>
                    </div>
                    <div className="cell-start-my-trial">
                        <button className="btn-start-my-trial">Start my trial</button>
                    </div>
                </div>
                
            </div>
            
        </div>
    );

}

export default PricingComponent;