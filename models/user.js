const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'user',{
            userid:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement: true
            },
            password:{
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            location:{
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(12),
                allowNull: false,
            },
            profile_img:{
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            nickname:{
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            birthday:{
                type : DataTypes.STRING(20),
                allowNull:false,
            },
            name:{
                type : DataTypes.STRING(15),
                allowNull:false,
            }
        },{
            freezeTableName: true,
            timestamps: false
        }
    )
    return model;
}

module.exports = User;