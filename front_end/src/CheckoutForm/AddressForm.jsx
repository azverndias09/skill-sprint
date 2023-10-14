import React, {useState, useEffect} from 'react'

import {InputLabel, Select, MenuItem,Button,Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import {Link} from 'react-router-dom';
import FormInput from './Checkout/CustomTextField';
import { commerce } from '../../lib/commerce';

const AddressForm = ({checkoutToken, next}) => {

 //   const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('IN');
   const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');

 //   const [shippingOptions, setShippingOptions] = useState([]);
 //   const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

  //  const countries =   Object.entries(shippingCountries).map(([code, name ])=>({id: code,label:name}));
   
const subdivisions =   Object.entries(shippingSubdivisions).map(([code, name ])=>({id: code,label:name}));


    // const setIndia = async (checkoutTokenId) => {

    //         const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
           
    //    //     setShippingCountries(countries);
    //         setShippingCountry(Object.keys(countries)[0]);
            
            


    // }

    const indianSubdivisions = async (countryCode) => {
       const { subdivisions } = await commerce.services.localeListSubdivisions('IN');
    
         setShippingSubdivisions(subdivisions);
       console.log(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[9]);
        console.log(shippingSubdivision);
      };

    

    useEffect(() => {

      //  setIndia(checkoutToken.id);
        indianSubdivisions(shippingCountry);
        console.log(shippingCountry);
    }, [checkoutToken]);




    return (
        <>  
            <Typography variant="h6" gutterBottom>Shipping Adress</Typography>

            <FormProvider {...methods}> 
               
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision}))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='Enter First Name'/>
                        <FormInput name='lastName' label='Enter last Name'/>
                        <FormInput name='email' label='Enter Email'/>
                        <FormInput name='Adress' label='Enter Adress'/>
                        
                            {/* <Grid item xs={12} sm={6}>
                               <InputLabel>Shipping Country</InputLabel> 
                               <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>

                                    {countries.map((country)=>(

                                            <MenuItem key={country.id} value={country.id}>
                                           {country.label}   
                                            </MenuItem>

                                    ))}
                                    

                               </Select>
                                
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                               <InputLabel>Shipping Options</InputLabel> 
                               <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>

                                    {subdivisions.map((subdivision)=>(

                                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                           {subdivision.label}   
                                            </MenuItem>

                                    ))}
                                    
                               </Select>
                                
                            </Grid>

                            <FormInput name='City' label='Enter City'/>
                        <FormInput name='Zip' label='Enter Zip'/>
                    </Grid>

                    <br/>
                    <div style ={{display:'flex', justifyContent: 'space-between' }}>
                                <Button component={Link} to="/cart"variant="outlined">Back To Cart</Button>
                                <Button type="submit" variant="contained" color="primary">Next</Button>
                        
                    </div>                    
                    
                </form>

            </FormProvider>
        </>
    );
}

export default AddressForm;
