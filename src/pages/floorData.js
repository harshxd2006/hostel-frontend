export const groundFloor = {
  topLeftRooms:  [
    { id:'G014', cap:4, booked:false },
    { id:'G024', cap:4, booked:false },
    { id:'G034', cap:4, booked:true  },
  ],
  topCenterRooms:[
    { id:'G044', cap:4, booked:false },
    { id:'G054', cap:4, booked:false },
  ],
  innerTopRooms: [
    { id:'G063', cap:3, booked:false },
    { id:'G073', cap:3, booked:false },
  ],
  innerBottomRooms:[
    { id:'G083', cap:3, booked:false },
    { id:'G093', cap:3, booked:true  },
  ],
  bottomRooms:[
    { id:'G104', cap:4, booked:false },
    { id:'G114', cap:4, booked:false },
    { id:'G124', cap:4, booked:false },
  ],
}

const makeFloor = (prefix, leftBooked, topBooked, rightBooked, bottomBooked, innerTopBooked, innerBottomBooked) => ({
  leftRooms: [8,7,6,5,4,3,2,1].map((n,i)=>({ id:`${prefix}0${n}`, cap:4, booked: leftBooked.includes(n) })),
  topRooms:  [9,10,11,12,13,14,15,16,17].map(n=>({ id:`${prefix}${n}`, cap:4, booked: topBooked.includes(n) })),
  rightRooms:[18,19,20,21,22,23,24,25].map(n=>({ id:`${prefix}${n}`, cap:3, booked: rightBooked.includes(n) })),
  bottomRooms:[134,133,132,131,130,129,128,127,126].map(n=>{
    const actual = parseInt(prefix)*100 + (n - 100)
    return { id:`${actual}`, cap:3, booked: bottomBooked.includes(n-100) }
  }),
  innerTopLeft:   [
    { id:`${prefix}38`, cap:3, booked: innerTopBooked.includes(38) },
    { id:`${prefix}37`, cap:3, booked: innerTopBooked.includes(37) },
  ],
  innerTopRight:  [{ id:`${prefix}39`, cap:3, booked: innerTopBooked.includes(39) }],
  innerBotLeft:   [
    { id:`${prefix}36`, cap:3, booked: innerBottomBooked.includes(36) },
    { id:`${prefix}35`, cap:3, booked: innerBottomBooked.includes(35) },
  ],
  innerBotRight:  [{ id:`${prefix}40`, cap:3, booked: innerBottomBooked.includes(40) }],
})

// Floor 1
export const floor1 = {
  leftRooms:  [
    { id:'108', cap:4, booked:false },{ id:'107', cap:4, booked:false },
    { id:'106', cap:4, booked:false },{ id:'105', cap:4, booked:true  },
    { id:'104', cap:4, booked:false },{ id:'103', cap:4, booked:false },
    { id:'102', cap:4, booked:false },{ id:'101', cap:4, booked:false },
  ],
  topRooms:   [109,110,111,112,113,114,115,116,117].map(n=>({ id:`${n}`, cap:4, booked:false })),
  rightRooms: [118,119,120,121,122,123,124].map(n=>({ id:`${n}`, cap:3, booked:false })).concat([{ id:'125', cap:3, booked:true }]),
  bottomRooms:[134,133,132,131,130].map(n=>({ id:`${n}`, cap:3, booked:false })).concat(
               [{ id:'129', cap:3, booked:true }],
               [128,127,126].map(n=>({ id:`${n}`, cap:3, booked:false }))),
  innerTopLeft:  [{ id:'138', cap:3, booked:false },{ id:'137', cap:3, booked:false }],
  innerTopRight: [{ id:'139', cap:3, booked:false }],
  innerBotLeft:  [{ id:'136', cap:3, booked:false },{ id:'135', cap:3, booked:false }],
  innerBotRight: [{ id:'140', cap:3, booked:false }],
}

export const floor2 = {
  leftRooms: [
    { id:'208', cap:4, booked:false },{ id:'207', cap:4, booked:true  },
    { id:'206', cap:4, booked:false },{ id:'205', cap:4, booked:false },
    { id:'204', cap:4, booked:false },{ id:'203', cap:4, booked:false },
    { id:'202', cap:4, booked:false },{ id:'201', cap:4, booked:false },
  ],
  topRooms: [
    { id:'209', cap:4, booked:false },{ id:'210', cap:4, booked:false },
    { id:'211', cap:4, booked:true  },{ id:'212', cap:4, booked:false },
    { id:'213', cap:4, booked:true  },{ id:'214', cap:4, booked:false },
    { id:'215', cap:4, booked:true  },{ id:'216', cap:4, booked:false },
    { id:'217', cap:4, booked:false },
  ],
  rightRooms: [
    { id:'218', cap:3, booked:true  },{ id:'219', cap:3, booked:false },
    { id:'220', cap:3, booked:false },{ id:'221', cap:3, booked:false },
    { id:'222', cap:3, booked:true  },{ id:'223', cap:3, booked:true  },
    { id:'224', cap:3, booked:false },{ id:'225', cap:3, booked:false },
  ],
  bottomRooms: [
    { id:'234', cap:3, booked:false },{ id:'233', cap:3, booked:false },
    { id:'232', cap:3, booked:true  },{ id:'231', cap:3, booked:false },
    { id:'230', cap:3, booked:false },{ id:'229', cap:3, booked:false },
    { id:'228', cap:3, booked:false },{ id:'227', cap:3, booked:false },{ id:'226', cap:3, booked:false },
  ],
  innerTopLeft:  [{ id:'238', cap:3, booked:true  },{ id:'237', cap:3, booked:false }],
  innerTopRight: [{ id:'239', cap:3, booked:false }],
  innerBotLeft:  [{ id:'236', cap:3, booked:true  },{ id:'235', cap:3, booked:false }],
  innerBotRight: [{ id:'240', cap:3, booked:false }],
}

export const floor3 = {
  leftRooms: [
    { id:'308', cap:4, booked:true  },{ id:'307', cap:4, booked:false },
    { id:'306', cap:4, booked:false },{ id:'305', cap:4, booked:false },
    { id:'304', cap:4, booked:false },{ id:'303', cap:4, booked:true  },
    { id:'302', cap:4, booked:false },{ id:'301', cap:4, booked:false },
  ],
  topRooms: [
    { id:'309', cap:4, booked:false },{ id:'310', cap:4, booked:false },
    { id:'311', cap:4, booked:false },{ id:'312', cap:4, booked:false },
    { id:'313', cap:4, booked:false },{ id:'314', cap:4, booked:false },
    { id:'315', cap:4, booked:false },{ id:'316', cap:4, booked:false },
    { id:'317', cap:4, booked:true  },
  ],
  rightRooms: [
    { id:'318', cap:3, booked:true  },{ id:'319', cap:3, booked:false },
    { id:'320', cap:3, booked:true  },{ id:'321', cap:3, booked:false },
    { id:'322', cap:3, booked:false },{ id:'323', cap:3, booked:false },
    { id:'324', cap:3, booked:false },{ id:'325', cap:3, booked:false },
  ],
  bottomRooms: [
    { id:'334', cap:3, booked:false },{ id:'333', cap:3, booked:false },
    { id:'332', cap:3, booked:false },{ id:'331', cap:3, booked:false },
    { id:'330', cap:3, booked:false },{ id:'329', cap:3, booked:false },
    { id:'328', cap:3, booked:true  },{ id:'327', cap:3, booked:false },{ id:'326', cap:3, booked:false },
  ],
  innerTopLeft:  [{ id:'338', cap:3, booked:false },{ id:'337', cap:3, booked:true  }],
  innerTopRight: [{ id:'339', cap:3, booked:false }],
  innerBotLeft:  [{ id:'336', cap:3, booked:false },{ id:'335', cap:3, booked:false }],
  innerBotRight: [{ id:'340', cap:3, booked:false }],
}

export const floor4 = {
  leftRooms: [
    { id:'408', cap:4, booked:true  },{ id:'407', cap:4, booked:false },
    { id:'406', cap:4, booked:true  },{ id:'405', cap:4, booked:false },
    { id:'404', cap:4, booked:false },{ id:'403', cap:4, booked:true  },
    { id:'402', cap:4, booked:false },{ id:'401', cap:4, booked:false },
  ],
  topRooms: [
    { id:'409', cap:4, booked:false },{ id:'410', cap:4, booked:true  },
    { id:'411', cap:4, booked:false },{ id:'412', cap:4, booked:false },
    { id:'413', cap:4, booked:false },{ id:'414', cap:4, booked:true  },
    { id:'415', cap:4, booked:true  },{ id:'416', cap:4, booked:true  },
    { id:'417', cap:4, booked:false },
  ],
  rightRooms: [
    { id:'418', cap:3, booked:true  },{ id:'419', cap:3, booked:false },
    { id:'420', cap:3, booked:true  },{ id:'421', cap:3, booked:false },
    { id:'422', cap:3, booked:false },{ id:'423', cap:3, booked:true  },
    { id:'424', cap:3, booked:false },{ id:'425', cap:3, booked:false },
  ],
  bottomRooms: [
    { id:'434', cap:3, booked:true  },{ id:'433', cap:3, booked:false },
    { id:'432', cap:3, booked:false },{ id:'431', cap:3, booked:true  },
    { id:'430', cap:3, booked:false },{ id:'429', cap:3, booked:false },
    { id:'428', cap:3, booked:false },{ id:'427', cap:3, booked:false },{ id:'426', cap:3, booked:true  },
  ],
  innerTopLeft:  [{ id:'438', cap:3, booked:true  },{ id:'437', cap:3, booked:false }],
  innerTopRight: [{ id:'439', cap:3, booked:false }],
  innerBotLeft:  [{ id:'436', cap:3, booked:false },{ id:'435', cap:3, booked:false }],
  innerBotRight: [{ id:'440', cap:3, booked:false }],
}

export const floor5 = {
  leftRooms: [
    { id:'508', cap:4, booked:false },{ id:'507', cap:4, booked:false },
    { id:'506', cap:4, booked:false },{ id:'505', cap:4, booked:false },
    { id:'504', cap:4, booked:false },{ id:'503', cap:4, booked:false },
    { id:'502', cap:4, booked:true  },{ id:'501', cap:4, booked:false },
  ],
  topRooms: [
    { id:'509', cap:4, booked:true  },{ id:'510', cap:4, booked:false },
    { id:'511', cap:4, booked:false },{ id:'512', cap:4, booked:false },
    { id:'513', cap:4, booked:false },{ id:'514', cap:4, booked:false },
    { id:'515', cap:4, booked:false },{ id:'516', cap:4, booked:false },{ id:'517', cap:4, booked:false },
  ],
  rightRooms: [
    { id:'518', cap:3, booked:false },{ id:'519', cap:3, booked:true  },
    { id:'520', cap:3, booked:false },{ id:'521', cap:3, booked:false },
    { id:'522', cap:3, booked:true  },{ id:'523', cap:3, booked:false },
    { id:'524', cap:3, booked:true  },{ id:'525', cap:3, booked:true  },
  ],
  bottomRooms: [
    { id:'534', cap:3, booked:true  },{ id:'533', cap:3, booked:false },
    { id:'532', cap:3, booked:false },{ id:'531', cap:3, booked:false },
    { id:'530', cap:3, booked:false },{ id:'529', cap:3, booked:false },
    { id:'528', cap:3, booked:true  },{ id:'527', cap:3, booked:false },{ id:'526', cap:3, booked:true  },
  ],
  innerTopLeft:  [{ id:'538', cap:3, booked:false },{ id:'537', cap:3, booked:false }],
  innerTopRight: [{ id:'539', cap:3, booked:false }],
  innerBotLeft:  [{ id:'536', cap:3, booked:false },{ id:'535', cap:3, booked:false }],
  innerBotRight: [{ id:'540', cap:3, booked:false }],
}

export const floor6 = {
  leftRooms: [608,607,606,605,604,603,602,601].map(n=>({ id:`${n}`, cap:4, booked:false })),
  topRooms: [
    { id:'609', cap:4, booked:false },{ id:'610', cap:4, booked:false },
    { id:'611', cap:4, booked:false },{ id:'612', cap:4, booked:false },
    { id:'613', cap:4, booked:false },{ id:'614', cap:4, booked:false },
    { id:'615', cap:4, booked:false },{ id:'616', cap:4, booked:true  },{ id:'617', cap:4, booked:false },
  ],
  rightRooms: [
    { id:'618', cap:3, booked:false },{ id:'619', cap:3, booked:false },
    { id:'620', cap:3, booked:false },{ id:'621', cap:3, booked:true  },
    { id:'622', cap:3, booked:false },{ id:'623', cap:3, booked:false },
    { id:'624', cap:3, booked:false },{ id:'625', cap:3, booked:false },
  ],
  bottomRooms: [
    { id:'634', cap:3, booked:false },{ id:'633', cap:3, booked:false },
    { id:'632', cap:3, booked:true  },{ id:'631', cap:3, booked:false },
    { id:'630', cap:3, booked:false },{ id:'629', cap:3, booked:false },
    { id:'628', cap:3, booked:false },{ id:'627', cap:3, booked:false },{ id:'626', cap:3, booked:false },
  ],
  innerTopLeft:  [{ id:'638', cap:3, booked:false },{ id:'637', cap:3, booked:false }],
  innerTopRight: [{ id:'639', cap:3, booked:false }],
  innerBotLeft:  [{ id:'636', cap:3, booked:true  },{ id:'635', cap:3, booked:false }],
  innerBotRight: [{ id:'640', cap:3, booked:false }],
}
