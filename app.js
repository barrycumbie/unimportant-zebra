const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const app = express()
const { MongoClient, ServerApiVersion, ListIndexesCursor } = require('mongodb');
const { resourceLimits } = require('node:worker_threads');
const uri = "mongodb+srv://dev-papa:yes123@dev-lab-papa.6opbmby.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

async function main(){
  try {
      // Connect to the MongoDB cluster
        client.connect();
        const collection = client.db("OAC").collection("Kayaks");
        const collection2 = client.db("OAC").collection("renters");
        const kayaksAvailable= await collection.countDocuments();
        const renterNum = await collection2.countDocuments();

        //does count correctly!!! Print this on employee page(index.ejs)
        math = (kayaksAvailable-renterNum);
        console.log(math);
        console.log(kayaksAvailable);
        console.log(renterNum);
        
        console.log('connected');
          // console.log('console log closed');
      
      
      let posts = await collection.find().toArray();
   
      return posts; 
    
  } catch (e) {
      console.error(e);
  } finally {

  }
}

app.get('/', async (req, res) => {
try{

  const result = await main().catch(console.error);
  // console.log("results: ", result); 
  // console.log("get / result name: ", result.name); 

  if(!result) return false; 

  res.render('index', { 
    kayaks: result,
    renter: result
  })
 

} catch (e) {
  console.error(e);
} finally {
  //  client.close();
}
});

app.post('/result', async (req, res) => {

  try {
    console.log("req.body: ", req.body.name) 
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.insertOne( { name : req.body.name } );
      
    res.redirect('/');
  }
  catch(e){
    console.log(e)
  }
  finally{
    // client.close
  
  }
}),

app.post('/deleteKayaks/:name', async (req, res) => 
{

  console.log('req.params.name', req.params.name);
  try {
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.findOneAndDelete( 
        { name : req.params.name } )
      
        res.redirect('/');
    
      } catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
      }
    })

app.post('/updateKayaks/:name', async (req, res) => 
{

  console.log('req.params.name', req.params.name);
  try {
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.findOneAndUpdate( 
        { name : req.params.name },
        {
          $set: {
            name: 'Kayak ###',
            }
        } 
        
        )
      
        res.redirect('/');
    
      } catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
      }
    }),

app.post('/result2', async (req, res) => {

      try {
        console.log("req.body: ", req.body.name) 
        client.connect; 
        const collection = client.db("OAC").collection("renters");
        await collection.insertOne( { name : req.body.name2 } );
        await collection.insertOne( { lNum : req.body.num2 } );
        await collection.insertOne( { phoneNum : req.body.phoneNum } );
        await collection.insertOne( { dateRent : req.body.date } );
          
        res.redirect('/');
      }
      catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
      }
    }), //this adds a renter 
    


    

app.listen(PORT, console.log(`server is running on port: ${PORT}` ));

// login:
// admin creds == yes
// admin only; if checkbox clicked
// print rented
// if not print available
// 