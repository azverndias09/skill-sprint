import React,{ useState,useEffect  } from 'react';

import {Paper,Stepper,Step,Typography,StepLabel,Divider,Button, CircularProgress} from '@material-ui/core';
import useStyles from '../styles';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

const steps =['Shipping Adress','Payment Details'];

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    
   
    const [checkoutToken,setCheckoutToken] = useState(null);
    const [activeStep,setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    
    const  classes =  useStyles();
    const nextStep = () => {setActiveStep((prevActiveStep)=> prevActiveStep+1)};

    
    const prevStep = () => {setActiveStep((prevActiveStep)=> prevActiveStep-1)};    

    useEffect(()=>{
        
        const generateToken = async () => {

            try {
                const token  = await commerce.checkout.generateToken(cart.id,{type:'cart'});
               

                setCheckoutToken(token);                
            }   catch(error){
                console.log(error);
            }
        }

        generateToken();

    },[cart]);


    const next = (data) =>{
       
       console.log(data)
       setShippingData(data);
       console.log(shippingData);
        nextStep();
     

    }
    

   
  
    const Form = () => activeStep === 0 
        ?<AddressForm checkoutToken={checkoutToken} next={next}/>
        :<PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} prevStep={prevStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeOut={timeOut}/>


        const timeOut= () => {

            setTimeout(()=>{

                setIsFinished(true);

            },3000);
        }


    let Confirmation = () =>order.customer ? (
        <>
        <div>
            <Typography variant="h5">Thank You For Your Purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider }/>
            <Typography variant="subtitle2">Order Ref:{order.customer_reference}</Typography>
            </div>  
                <br/>
            <Button component={Link} to="/"  variant="outlined" type="button">Back To Home</Button>
        </>
    ):isFinished?(
        <>
        <div>
            <Typography variant="h5">Thank You For Your Purchase</Typography>
                <Divider className={classes.divider }/>
            <Typography variant="subtitle2">Order Ref:{order.customer_reference}</Typography>
            </div>  
                <br/>
            <Button component={Link} to="/"  variant="outlined" type="button">Back To Home</Button>
        </>

    ): 
    (
        <div className={classes.spinner}>
            <CircularProgress/>

        </div> 

    );

    if(error){
        <>
        <Typography variant="h5">Error:{error}</Typography>
        <br />
        <Button component={Link} to="/"  variant="outlined" type="button">Back To Home</Button>

        </>
    }

    return (
        <>
            <div className={classes.toolbar} />

            <main className={classes.layout}>
                <Paper className={classes.paper}>

                    <Typography variant="h4" align="center">
                            Checkout
                    </Typography>

                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            
                            <Step key={step}>
                            <StepLabel>{step}</StepLabel>

                            </Step>
                        ))}

                    </Stepper>
                    
                    {activeStep === steps.length ? <Confirmation /> :checkoutToken && <Form/>}
                </Paper>

            </main>
        </>
    );
};

export default Checkout
