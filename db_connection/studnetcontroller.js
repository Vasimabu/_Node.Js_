exports.edituser= async (req,res)=>{
    const ID=parseInt(req.params.ID);

     try{
        await mssql.connect(config)
        // Create a new request instance
        const request = new mssql.Request();

        // Query the database
        request.input('ID',mssql.Int,parseInt(ID))
        const result = await request.query("SELECT * FROM users WHERE ID=@ID")
        
        if (result.recordset.length > 0) {
            res.render('edituser', { user: result.recordset[0] });
        } else {
            res.status(404).send("User not found");
        }
     } catch(err){
                console.error("Database eror: ", err);
                res.status(500).send("Error retrieving query");
        }finally{
            await mssql.close();
        }
    };

exports.edit = async (req, res) => {
        // Extract data from request body
        const { Name, Age, City } = req.body;
        const ID=req.params.ID;


        // Log the extracted data to verify
        console.log('Received data:', { Name, Age, City, ID });

        // Validate incoming data
        if (!Name || !Age || !City || !ID) {
            console.error('Invalid input data');
            res.status(400).send("Invalid input data. Please provide Name, Age, City and ID. ");
            return;
        }
    try{
        // Create a new connection
        const pool = await mssql.connect(config);

        // Create a new request instance and set parameters
        const request = pool.request();
        request.input('Name', mssql.NVarChar, Name);
        request.input('Age', mssql.Int, parseInt(Age)); // Ensure Age is an integer
        request.input('City', mssql.NVarChar, City);
        request.input('ID', mssql.Int, parseInt(ID));


        // Define and execute the query
        const query = `
            UPDATE users 
            SET Name = @Name, Age = @Age, City = @City 
            WHERE ID = @ID
        `;
        await request.query(query);

        // Success: Redirect to a success page or another route
        res.redirect(`/edituser/+${ID}?msg:user details add sucess`); // Ensure you have a route for '/adduser'
    } catch (err) {
        // Log detailed error information
        console.error("Database error: ", err);

        res.status(500).send("An error occurred while processing your request.");
    } finally {
        // Ensure the connection is closed
        await mssql.close();
    }
}; 


