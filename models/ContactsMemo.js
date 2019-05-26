
module.exports = function(sequelize, DataTypes){
    const MemberMemo = sequelize.define('MemberMemo',
        {
            id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
            content :  { 
                type: DataTypes.TEXT,
                validate : {
                    len : [0, 500],
                } 
            }
        },{
            tableName: 'MemberMemo'
        }
    );


    return MemberMemo;
}