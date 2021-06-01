module.exports = {
  run(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.building) {
      var sources = creep.pos.findClosestByRange(
          FIND_STRUCTURES, {filter : {structureType : STRUCTURE_CONTAINER}});
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, {visualizePathStyle : {stroke : '#EA0000'}});
      }
    } else {

      const targets = creep.room.find(FIND_STRUCTURES, {
        filter : object => object.hits < object.hitsMax,
        structureType : STRUCTURE_CONTAINER
      });

      targets.sort((a, b) => a.hits - b.hits);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
  }
}
