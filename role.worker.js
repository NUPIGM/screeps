module.exports = {
  run(creep) {
    if (creep.pos.isEqualTo(12, 6)) {
      creep.harvest(creep.room.find(FIND_SOURCES)[0]);
    } else {
      creep.moveTo(12, 6);
    }
  }
}
