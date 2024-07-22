import mongoose from 'mongoose';
function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('invalid ID');
    return res.status(400).json({msg: error.message});
  }
}

function handleNotFoundError(msg, res) {
  const error = new Error(msg);
  return res.status(404).json({msg: error.message});
}
//*Token by Date (not install dependencies)

const uniqueId =
  Date.now().toString(32) + Math.random().toString(32).substring(2);

export {validateObjectId, handleNotFoundError, uniqueId};
