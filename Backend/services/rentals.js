const RentalModel = require('../models/Rental');
const ChaletModel = require('../models/Chalet');
const UserModel = require('../models/User');

module.exports.addNewRental = async (RentalInfo) => {
    const rental = new RentalModel({
    userId: RentalInfo.userId,
    chaletId: RentalInfo.chaletId,
    startDate: RentalInfo.startDate,
    endDate: RentalInfo.endDate,

  });
  try {
    const rented = await ChaletModel.updateOne({ _id: rental.chaletId }, { $set: { is_rented: true } });
    const addedRental = await rental.save();
    const user = await UserModel.updateOne({ _id: rental.userId }, { $set: { rentalId: addedRental._id } });

    return addedRental;
  } catch (error) {
    console.log(error);
    throw new Error('Could not add rental.');
  }
};

module.exports.findAllRentals = async () => {
    try {
      const rentals = await RentalModel.find().populate('userId').populate('chaletId');
      return rentals;
    } catch (err) {
      throw new Error('Could not retrieve Rentals.');
    }
  };

module.exports.findRentalById = async (rentalId) => {
    try {
      const rental = await RentalModel.findOne(rentalId);
      return rental;
    } catch (err) {
      throw new Error('Could not findd rentals.');
    }
  };

  module.exports.findUserRentals = async (userId) => {
    try {
      const rental = await RentalModel.find({ userId: userId }).sort({_id:-1}).limit(1);
      return rental;
    } catch (err) {
      throw new Error('Could not find rentals.');
    }
  };

module.exports.removeRental = async (rentalId,chaletId) => {

    try {

      const rental = await RentalModel.find( { _id : rentalId } );
      await RentalModel.deleteOne({ _id: rentalId });

      const rented = await ChaletModel.updateOne({ _id: chaletId }, { $set: { is_rented: false } });
      // const deletedRental = await rented.save();
      // return deletedRental;
      
    } catch (err) {
      throw new Error('Could not remove Rental.');
    }
  };

  // module.exports.extendRental = async (rentalInfo) => {
  //   const RentalInfo = {
  //   rentalId:rentalInfo.rentalId,
  //   endDate:rentalInfo.endDate 
  //    //10 -> 10/10/2022
  //   }
  //   try {
      
  //     const updatedRent = await RentalModel.findByIdAndUpdate({_id: RentalInfo.rentalId}, {$set :{endDate: RentalInfo.endDate} 
  //       // RentalInfo.endDate 
  //     });

  //     console.log(updatedRent);
  //     return updatedRent;

  //   } catch (err) {
  //     throw new Error('Could not extend Rental.');
  //   }
  // };

  module.exports.extendRental = async (rentalInfo) => {
    const RentalInfo={
      rentalId:rentalInfo.rentalId,
      endDate:rentalInfo.endDate
    };

    try {
      
      const updatedRent = await RentalModel.findByIdAndUpdate({_id:RentalInfo.rentalId}, 
        {$set:{endDate:RentalInfo.endDate}});
      //console.log(updatedRent);
      return updatedRent;

    } catch (err) {
      throw new Error('Could not extend Rental.');
    }
  };