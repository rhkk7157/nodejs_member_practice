module.exports = function(sequelize, DataTypes){
    var Member = sequelize.define('Member',
        {
            idx : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id : { type: DataTypes.STRING },
            pwd : { type: DataTypes.INTEGER },
            name : { type: DataTypes.STRING }
        }
    );
    
    // 제품 모델 관계도
    Member.associate = (models) => {

        // 메모 모델에 외부키를 건다
        // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제해준다
        Member.hasMany(models.MemberMemo, { as: 'Memo', foreignKey: 'member_id', sourceKey: 'idx', onDelete: 'CASCADE' });

    };

    return Member;
    
}

