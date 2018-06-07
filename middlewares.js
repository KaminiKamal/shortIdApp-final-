module.exports = {
	authenticate : function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");
res.redirect('/login');
	}
	
	next();
}
};
