module.exports = {
  run(spawn1) {
    var newtime = Game.time;
    // 过滤各角色的数量    begin
    var harvesters =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers =
        _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    // 过滤各角色的数量     end
    // 自动孵化     begin
    if (harvesters.length < 3) {
      spawn1.spawnCreep([ WORK, CARRY, MOVE ], 'harvester' + newtime,
                        {memory : {role : 'harvester'}});

    } else if (upgraders.length < 4) {
      spawn1.spawnCreep([ WORK, CARRY, CARRY, MOVE, MOVE ],
                        'upgrader' + newtime, {memory : {role : 'upgrader'}});
    } else if (builders.length < 5) {
      spawn1.spawnCreep([ WORK, CARRY, CARRY, MOVE, MOVE ], 'builder' + newtime,
                        {memory : {role : 'builder', building : 'true'}});
    } else if (repairers.length < 3) {
      spawn1.spawnCreep([ WORK, CARRY, MOVE, MOVE ], 'repairer' + newtime,
                        {memory : {role : 'repairer', building : 'true'}});
    }
    if (spawn1.spawning) {
      var creepName = spawn1.spawning.name;
      spawn1.room.visual.text(
          '⚒️' + Game.creeps[creepName].memory.role,
          spawn1.pos.x + 3,
          spawn1.pos.y,
      );

      //清理内存    begin
      for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
        }
      }
      //清理内存    end
    }
    // var mycars = new Array();
    // for (var name in Game.creeps) {
    //   var creeprole[] = Game.creeps[name].memory.role;
    //   console.log(creeprole);
    // }

    // 自动孵化   end
    //
  }
}
