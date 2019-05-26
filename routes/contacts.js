const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res){
    res.send('contacts app!');
});

router.get('/list',async (req,res) => {
    try {
        const member = await models.Member.findAll();
        res.render('contacts/list.html',{ member });
    } catch (error) {
        
    }
});

router.get('/list/join',function(req,res) {
    res.render('contacts/join.html');
});

router.post('/list/join', async (req,res) => {
    try {
        var user_id = req.body.id;

        const mem_id = await models.Member.findOne({
            where : {id:user_id}
        });
        if(mem_id != null) {
            res.send('<script> \
                alert("아이디가 중복됩니다."); \
                history.go(-1); \
            </script>');
        }else{
            await models.Member.create(req.body);
            res.redirect('/contacts/list');
        }
    } catch (e) {
        console.log(e);
    }
});

router.get('/detail/:idx', async (req,res) => {
    try {
        const member = await models.Member.findOne({
            where : {
                idx : req.params.idx
            },
            include : [
                'Memo'  //as 에 적었던 내용
            ]
        });
        res.render('contacts/detail.html',{ member });
    } catch (error) {
        
    }
})


router.post('/detail/:idx', async (req,res) => {
    try {
        
        const member = await models.Member.findByPk(req.params.idx);
        await member.createMemo(req.body);
        res.redirect('/contacts/detail/'+req.params.idx);
        
    } catch (error) {
        
    }
})

router.get('/list/edit/:idx', async (req,res) => {
    try {
        const member = await models.Member.findByPk(req.params.idx);
        res.render('contacts/join.html', { member });
    } catch (error) {
        
    }
});

router.post('/list/edit/:idx', async (req,res) => {
    try {
        const member = await models.Member.update(req.body,
            {
                where : {idx : req.params.idx}
            });
        res.redirect('/contacts/detail/'+req.params.idx);
    } catch (error) {
        
    }
});

router.get('/delete/:idx', async (req,res) => {
    try {
        await models.Member.destroy({
            where : {idx:req.params.idx}
        });
        res.redirect('/contacts/list'); 
    } catch (error) {
        
    }
});

router.post('/detail/:idx', async (req,res) => {
    await models.MemberMemo.create(req.body,{
        where : {idx:req.params.idx}
    });
    res.redirect('/detail/'+req.params.idx);
});

router.get('/delete/:member_idx/:memo_id', async (req,res) => {
    try {
        await models.MemberMemo.destroy({
            where : {id:req.params.memo_id}
        })
        res.redirect('/contacts/detail/'+req.params.member_idx);
    } catch (error) {
        
    }
})



module.exports = router;