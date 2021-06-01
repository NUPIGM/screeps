var roleBuilder = {

  /** @param {Creep} creep **/
  run : function(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if (targets) {
        if (creep.build(targets) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets, {visualizePathStyle : {stroke : '#2828FF'}});
        }
      } else {
        if (creep.pos.isEqualTo(5, 9)) {
          creep.drop(RESOURCE_ENERGY);
        } else {
          creep.moveTo(5, 9);
        }
      }

    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle : {stroke : '#EA0000'}});
      }
    }
  }
};

module.exports = roleBuilder;
