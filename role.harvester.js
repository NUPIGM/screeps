module.exports = {
  run(creep, myTime) {
    if (!creep.memory.SourceId || !creep.memory.containerId) {
      creep.memory.containerId =
          creep.pos
              .findClosestByRange(
                  FIND_STRUCTURES,
                  {filter : {structureType : STRUCTURE_CONTAINER}})
              .id;
      creep.memory.sourcesId = creep.room.find(FIND_SOURCES)[0].id;
    }
    const source = Game.getObjectById(creep.memory.sourcesId);
    const container = Game.getObjectById(creep.memory.containerId);
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
      if (creep.pos.isEqualTo(container.pos)) {
        creep.drop(RESOURCE_ENERGY);
      } else {
        creep.moveTo(container);
      }
    } else {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle : {stroke : '#ffaa00'}});
        creep.say('gogogo');
      }
    }

    myTime++;
  }
}
