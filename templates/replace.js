const fs = require('fs');

const jsondata = JSON.parse( fs.readFileSync(__dirname+'/../data/data.json') );



function getproduct(id,productPage)
{
    jsondata[id].image;
   productPage= productPage.replace(/{%IMAGE%}/g,jsondata[id].image);
   productPage= productPage.replace(/{%PRODUCTNAME%}/g,jsondata[id].productName);
   productPage= productPage.replace(/{%FROM%}/g,jsondata[id].from);
   productPage= productPage.replace(/{%NUTRIENTS%}/g,jsondata[id].nutrients);
   productPage= productPage.replace(/{%QUANTITY%}/g,jsondata[id].quantity);
   productPage= productPage.replace(/{%PRICE%}/g,jsondata[id].price);
   productPage= productPage.replace(/{%DESCRIPTION%}/g,jsondata[id].description);
   if(jsondata[id].organic==false)
        productPage= productPage.replace(/{%NOT_ORGANIC%}/g,'not-organic');

   return productPage;
}
function getOverviewPage(overviewPage,cardPage){
    let overviewPagedata="";

    jsondata.forEach(e=>{

        cardPage2= cardPage.replace(/{%IMAGE%}/g,e.image);
        cardPage2= cardPage2.replace(/{%PRODUCTNAME%}/g,e.productName);
        cardPage2= cardPage2.replace(/{%FROM%}/g,e.from);
        cardPage2= cardPage2.replace(/{%NUTRIENTS%}/g,e.nutrients);
        cardPage2= cardPage2.replace(/{%QUANTITY%}/g,e.quantity);
        cardPage2= cardPage2.replace(/{%PRICE%}/g,e.price);
        cardPage2= cardPage2.replace(/{%DESCRIPTION%}/g,e.description);
        cardPage2= cardPage2.replace(/{%ID%}/g,e.id);

        if(e.organic==false)
        cardPage2= cardPage2.replace(/{%NOT_ORGANIC%}/g,'not-organic');
        overviewPagedata+=cardPage2;
    });
    return overviewPage.replace('{%PRODUCT_CARDS%}',overviewPagedata);

}
module.exports={
    getproduct,
    getOverviewPage
}


