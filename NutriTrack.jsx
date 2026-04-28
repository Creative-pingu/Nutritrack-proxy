import { useState, useEffect, useCallback, useRef } from "react";

const FOOD_DB = [
{ id:"oats",           name:"Oats (rolled)",           cat:"Grains",       cal:389, pro:16.9, carb:66.3, fat:6.9,  fib:10.6, fibSol:5.8,  fibInsol:4.8,  fatSat:1.2,  fatMufa:2.2,  fatPufa:2.5,  aaHis:0.43, aaIle:0.54, aaLeu:1.28, aaLys:0.70, aaMet:0.31, aaPhe:0.90, aaThr:0.57, aaTrp:0.19, aaVal:0.94, iron:4.7,  calc:54,  zinc:4.0, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:28.9, mag:177, pot:429,  fol:56  },
{ id:"rice_brown",     name:"Brown Rice (cooked)",      cat:"Grains",       cal:123, pro:2.7,  carb:25.6, fat:0.9,  fib:1.6,  fibSol:0.2,  fibInsol:1.4,  fatSat:0.2,  fatMufa:0.3,  fatPufa:0.3,  aaHis:0.08, aaIle:0.11, aaLeu:0.22, aaLys:0.10, aaMet:0.07, aaPhe:0.14, aaThr:0.10, aaTrp:0.03, aaVal:0.17, iron:0.4,  calc:10,  zinc:0.6, b12:0,    vitD:0,   omega3:0.02, iod:0,  sel:9.8,  mag:44,  pot:79,   fol:9   },
{ id:"rice_white",     name:"White Rice (cooked)",      cat:"Grains",       cal:130, pro:2.7,  carb:28.6, fat:0.3,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.07, aaIle:0.11, aaLeu:0.22, aaLys:0.09, aaMet:0.06, aaPhe:0.14, aaThr:0.10, aaTrp:0.03, aaVal:0.17, iron:0.2,  calc:10,  zinc:0.5, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:7.5,  mag:13,  pot:35,   fol:2   },
{ id:"quinoa",         name:"Quinoa (cooked)",          cat:"Grains",       cal:120, pro:4.4,  carb:21.3, fat:1.9,  fib:2.8,  fibSol:0.9,  fibInsol:1.9,  fatSat:0.2,  fatMufa:0.5,  fatPufa:1.1,  aaHis:0.18, aaIle:0.20, aaLeu:0.31, aaLys:0.30, aaMet:0.12, aaPhe:0.24, aaThr:0.18, aaTrp:0.05, aaVal:0.23, iron:1.5,  calc:17,  zinc:1.1, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:2.8,  mag:64,  pot:172,  fol:42  },
{ id:"bread_whole",    name:"Whole Wheat Bread",        cat:"Grains",       cal:247, pro:13.0, carb:41.3, fat:3.4,  fib:7.0,  fibSol:1.4,  fibInsol:5.6,  fatSat:0.7,  fatMufa:0.6,  fatPufa:1.5,  aaHis:0.29, aaIle:0.41, aaLeu:0.87, aaLys:0.31, aaMet:0.19, aaPhe:0.59, aaThr:0.33, aaTrp:0.13, aaVal:0.52, iron:3.6,  calc:107, zinc:1.8, b12:0,    vitD:0,   omega3:0.14, iod:14, sel:30.5, mag:76,  pot:248,  fol:44  },
{ id:"pasta",          name:"Pasta (cooked)",           cat:"Grains",       cal:131, pro:5.0,  carb:25.4, fat:1.1,  fib:1.8,  fibSol:0.4,  fibInsol:1.4,  fatSat:0.2,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.13, aaIle:0.20, aaLeu:0.42, aaLys:0.16, aaMet:0.09, aaPhe:0.29, aaThr:0.17, aaTrp:0.07, aaVal:0.25, iron:0.5,  calc:7,   zinc:0.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:26.4, mag:18,  pot:44,   fol:7   },
{ id:"tortilla_corn",  name:"Corn Tortilla",            cat:"Grains",       cal:218, pro:5.7,  carb:44.6, fat:2.8,  fib:6.7,  fibSol:1.3,  fibInsol:5.4,  fatSat:0.4,  fatMufa:0.7,  fatPufa:1.3,  aaHis:0.14, aaIle:0.18, aaLeu:0.57, aaLys:0.15, aaMet:0.09, aaPhe:0.25, aaThr:0.17, aaTrp:0.03, aaVal:0.25, iron:1.6,  calc:81,  zinc:0.7, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:10.3, mag:51,  pot:157,  fol:27  },
{ id:"flour_wheat",    name:"Wheat Flour (white)",      cat:"Grains",       cal:364, pro:10.3, carb:76.3, fat:1.0,  fib:2.7,  fibSol:0.5,  fibInsol:2.2,  fatSat:0.2,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.22, aaIle:0.40, aaLeu:0.80, aaLys:0.22, aaMet:0.17, aaPhe:0.54, aaThr:0.28, aaTrp:0.11, aaVal:0.44, iron:1.2,  calc:15,  zinc:0.7, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:33.9, mag:22,  pot:107,  fol:20  },
{ id:"pasta_dry",      name:"Pasta (dry)",              cat:"Grains",       cal:371, pro:13.0, carb:74.7, fat:1.5,  fib:3.2,  fibSol:0.6,  fibInsol:2.6,  fatSat:0.3,  fatMufa:0.2,  fatPufa:0.6,  aaHis:0.35, aaIle:0.52, aaLeu:1.10, aaLys:0.38, aaMet:0.23, aaPhe:0.75, aaThr:0.43, aaTrp:0.17, aaVal:0.64, iron:1.3,  calc:21,  zinc:1.4, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:63.2, mag:53,  pot:223,  fol:7   },
{ id:"rice_brown_dry", name:"Brown Rice (dry)",         cat:"Grains",       cal:370, pro:7.9,  carb:77.2, fat:2.9,  fib:3.5,  fibSol:0.4,  fibInsol:3.1,  fatSat:0.6,  fatMufa:1.1,  fatPufa:1.0,  aaHis:0.23, aaIle:0.33, aaLeu:0.67, aaLys:0.30, aaMet:0.21, aaPhe:0.43, aaThr:0.31, aaTrp:0.10, aaVal:0.50, iron:1.5,  calc:23,  zinc:2.0, b12:0,    vitD:0,   omega3:0.06, iod:0,  sel:23.4, mag:143, pot:268,  fol:20  },
{ id:"rice_white_dry", name:"White Rice (dry)",         cat:"Grains",       cal:365, pro:6.6,  carb:80.0, fat:0.7,  fib:1.3,  fibSol:0.2,  fibInsol:1.1,  fatSat:0.2,  fatMufa:0.2,  fatPufa:0.2,  aaHis:0.18, aaIle:0.32, aaLeu:0.63, aaLys:0.25, aaMet:0.19, aaPhe:0.39, aaThr:0.27, aaTrp:0.09, aaVal:0.49, iron:0.8,  calc:28,  zinc:1.2, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:15.1, mag:35,  pot:115,  fol:8   },
{ id:"quinoa_dry",     name:"Quinoa (dry)",             cat:"Grains",       cal:368, pro:14.1, carb:64.2, fat:6.1,  fib:7.0,  fibSol:2.3,  fibInsol:4.7,  fatSat:0.7,  fatMufa:1.6,  fatPufa:3.3,  aaHis:0.41, aaIle:0.50, aaLeu:0.84, aaLys:0.77, aaMet:0.31, aaPhe:0.59, aaThr:0.42, aaTrp:0.17, aaVal:0.65, iron:4.6,  calc:47,  zinc:3.1, b12:0,    vitD:0,   omega3:0.26, iod:0,  sel:8.5,  mag:197, pot:563,  fol:184 },
{ id:"lentils",        name:"Lentils (cooked)",         cat:"Legumes",      cal:116, pro:9.0,  carb:20.1, fat:0.4,  fib:7.9,  fibSol:2.6,  fibInsol:5.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.27, aaIle:0.37, aaLeu:0.65, aaLys:0.63, aaMet:0.08, aaPhe:0.44, aaThr:0.33, aaTrp:0.08, aaVal:0.42, iron:3.3,  calc:19,  zinc:1.3, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:2.8,  mag:36,  pot:369,  fol:181 },
{ id:"chickpeas",      name:"Chickpeas (cooked)",       cat:"Legumes",      cal:164, pro:8.9,  carb:27.4, fat:2.6,  fib:7.6,  fibSol:2.5,  fibInsol:5.1,  fatSat:0.3,  fatMufa:0.6,  fatPufa:1.2,  aaHis:0.25, aaIle:0.36, aaLeu:0.62, aaLys:0.52, aaMet:0.10, aaPhe:0.43, aaThr:0.30, aaTrp:0.09, aaVal:0.39, iron:2.9,  calc:49,  zinc:1.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:3.7,  mag:48,  pot:291,  fol:172 },
{ id:"black_beans",    name:"Black Beans (cooked)",     cat:"Legumes",      cal:132, pro:8.9,  carb:23.7, fat:0.5,  fib:8.7,  fibSol:2.9,  fibInsol:5.8,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.26, aaIle:0.38, aaLeu:0.67, aaLys:0.59, aaMet:0.11, aaPhe:0.46, aaThr:0.34, aaTrp:0.10, aaVal:0.44, iron:2.1,  calc:27,  zinc:1.0, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:1.2,  mag:70,  pot:355,  fol:149 },
{ id:"kidney_beans",   name:"Kidney Beans (cooked)",    cat:"Legumes",      cal:127, pro:8.7,  carb:22.8, fat:0.5,  fib:7.4,  fibSol:2.5,  fibInsol:4.9,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.25, aaIle:0.37, aaLeu:0.66, aaLys:0.57, aaMet:0.10, aaPhe:0.44, aaThr:0.33, aaTrp:0.09, aaVal:0.43, iron:2.2,  calc:50,  zinc:1.0, b12:0,    vitD:0,   omega3:0.19, iod:0,  sel:1.4,  mag:45,  pot:403,  fol:130 },
{ id:"tofu_firm",      name:"Tofu (firm)",              cat:"Legumes",      cal:144, pro:17.3, carb:3.5,  fat:8.7,  fib:0.3,  fibSol:0.1,  fibInsol:0.2,  fatSat:1.3,  fatMufa:1.9,  fatPufa:4.9,  aaHis:0.44, aaIle:0.76, aaLeu:1.32, aaLys:1.04, aaMet:0.22, aaPhe:0.81, aaThr:0.67, aaTrp:0.21, aaVal:0.82, iron:2.7,  calc:350, zinc:1.6, b12:0,    vitD:0,   omega3:0.58, iod:0,  sel:9.9,  mag:58,  pot:121,  fol:29  },
{ id:"tempeh",         name:"Tempeh",                   cat:"Legumes",      cal:192, pro:20.3, carb:7.6,  fat:10.8, fib:0,    fibSol:0,    fibInsol:0,    fatSat:2.2,  fatMufa:2.4,  fatPufa:5.6,  aaHis:0.51, aaIle:0.89, aaLeu:1.49, aaLys:1.14, aaMet:0.27, aaPhe:0.98, aaThr:0.77, aaTrp:0.28, aaVal:0.99, iron:2.7,  calc:111, zinc:1.7, b12:0,    vitD:0,   omega3:0.23, iod:0,  sel:0.1,  mag:81,  pot:412,  fol:0   },
{ id:"peanuts",        name:"Peanuts (raw)",            cat:"Legumes",      cal:567, pro:25.8, carb:16.1, fat:49.2, fib:8.5,  fibSol:2.1,  fibInsol:6.4,  fatSat:6.8,  fatMufa:24.4, fatPufa:15.6, aaHis:0.72, aaIle:0.93, aaLeu:1.67, aaLys:0.93, aaMet:0.28, aaPhe:1.31, aaThr:0.72, aaTrp:0.25, aaVal:1.11, iron:4.6,  calc:92,  zinc:3.3, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:7.2,  mag:168, pot:705,  fol:240 },
{ id:"peanut_butter",  name:"Peanut Butter",            cat:"Legumes",      cal:588, pro:25.1, carb:20.1, fat:49.9, fib:6.0,  fibSol:1.5,  fibInsol:4.5,  fatSat:10.3, fatMufa:23.7, fatPufa:13.5, aaHis:0.65, aaIle:0.83, aaLeu:1.52, aaLys:0.74, aaMet:0.26, aaPhe:1.19, aaThr:0.66, aaTrp:0.24, aaVal:1.01, iron:1.9,  calc:43,  zinc:2.9, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:5.1,  mag:154, pot:564,  fol:86  },
{ id:"hummus",         name:"Hummus",                   cat:"Legumes",      cal:166, pro:7.9,  carb:14.3, fat:9.6,  fib:6.0,  fibSol:2.0,  fibInsol:4.0,  fatSat:1.4,  fatMufa:5.1,  fatPufa:2.4,  aaHis:0.22, aaIle:0.31, aaLeu:0.54, aaLys:0.46, aaMet:0.09, aaPhe:0.38, aaThr:0.26, aaTrp:0.08, aaVal:0.34, iron:2.4,  calc:38,  zinc:1.1, b12:0,    vitD:0,   omega3:0.3,  iod:0,  sel:2.6,  mag:53,  pot:228,  fol:72  },
{ id:"lentils_dry",    name:"Lentils (dry)",            cat:"Legumes",      cal:353, pro:25.8, carb:60.1, fat:1.1,  fib:30.5, fibSol:10.0, fibInsol:20.5, fatSat:0.2,  fatMufa:0.2,  fatPufa:0.5,  aaHis:0.77, aaIle:1.07, aaLeu:1.87, aaLys:1.81, aaMet:0.22, aaPhe:1.27, aaThr:0.95, aaTrp:0.22, aaVal:1.21, iron:7.5,  calc:35,  zinc:3.3, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:8.3,  mag:122, pot:955,  fol:479 },
{ id:"chickpeas_dry",  name:"Chickpeas (dry)",          cat:"Legumes",      cal:364, pro:19.3, carb:60.6, fat:6.0,  fib:17.4, fibSol:5.8,  fibInsol:11.6, fatSat:0.6,  fatMufa:1.4,  fatPufa:2.7,  aaHis:0.55, aaIle:0.83, aaLeu:1.43, aaLys:1.29, aaMet:0.25, aaPhe:1.03, aaThr:0.72, aaTrp:0.19, aaVal:0.88, iron:6.2,  calc:105, zinc:3.4, b12:0,    vitD:0,   omega3:0.1,  iod:0,  sel:8.2,  mag:115, pot:875,  fol:557 },
{ id:"black_beans_dry",name:"Black Beans (dry)",        cat:"Legumes",      cal:341, pro:21.6, carb:62.4, fat:1.4,  fib:15.5, fibSol:5.1,  fibInsol:10.4, fatSat:0.4,  fatMufa:0.1,  fatPufa:0.6,  aaHis:0.68, aaIle:1.00, aaLeu:1.79, aaLys:1.58, aaMet:0.28, aaPhe:1.23, aaThr:0.91, aaTrp:0.24, aaVal:1.16, iron:5.0,  calc:123, zinc:3.7, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:3.7,  mag:171, pot:1483, fol:444 },
{ id:"kidney_beans_dry",name:"Kidney Beans (dry)",      cat:"Legumes",      cal:337, pro:22.5, carb:61.3, fat:0.8,  fib:15.2, fibSol:5.0,  fibInsol:10.2, fatSat:0.1,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.66, aaIle:0.98, aaLeu:1.73, aaLys:1.52, aaMet:0.25, aaPhe:1.17, aaThr:0.86, aaTrp:0.23, aaVal:1.12, iron:8.2,  calc:83,  zinc:2.8, b12:0,    vitD:0,   omega3:0.34, iod:0,  sel:3.2,  mag:140, pot:1359, fol:394 },
{ id:"almonds",        name:"Almonds",                  cat:"Nuts & Seeds", cal:579, pro:21.2, carb:21.6, fat:49.9, fib:12.5, fibSol:1.7,  fibInsol:10.8, fatSat:3.8,  fatMufa:31.6, fatPufa:12.3, aaHis:0.57, aaIle:0.70, aaLeu:1.47, aaLys:0.58, aaMet:0.15, aaPhe:1.12, aaThr:0.59, aaTrp:0.21, aaVal:0.82, iron:3.7,  calc:264, zinc:3.1, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:4.1,  mag:270, pot:733,  fol:44  },
{ id:"chia_seeds",     name:"Chia Seeds",               cat:"Nuts & Seeds", cal:486, pro:16.5, carb:42.1, fat:30.7, fib:34.4, fibSol:27.5, fibInsol:6.9,  fatSat:3.3,  fatMufa:2.3,  fatPufa:23.7, aaHis:0.38, aaIle:0.60, aaLeu:1.02, aaLys:0.97, aaMet:0.30, aaPhe:0.86, aaThr:0.59, aaTrp:0.44, aaVal:0.79, iron:7.7,  calc:631, zinc:4.6, b12:0,    vitD:0,   omega3:17.8, iod:0,  sel:55.2, mag:335, pot:407,  fol:49  },
{ id:"flaxseed",       name:"Flaxseed (ground)",        cat:"Nuts & Seeds", cal:534, pro:18.3, carb:28.9, fat:42.2, fib:27.3, fibSol:9.4,  fibInsol:17.9, fatSat:3.7,  fatMufa:7.5,  fatPufa:28.7, aaHis:0.48, aaIle:0.83, aaLeu:1.24, aaLys:0.86, aaMet:0.37, aaPhe:0.96, aaThr:0.77, aaTrp:0.30, aaVal:1.07, iron:5.7,  calc:255, zinc:4.3, b12:0,    vitD:0,   omega3:22.8, iod:0,  sel:25.4, mag:392, pot:813,  fol:87  },
{ id:"sunflower_seeds",name:"Sunflower Seeds",          cat:"Nuts & Seeds", cal:584, pro:20.8, carb:20.0, fat:51.5, fib:8.6,  fibSol:1.1,  fibInsol:7.5,  fatSat:4.5,  fatMufa:18.5, fatPufa:23.1, aaHis:0.54, aaIle:0.98, aaLeu:1.54, aaLys:0.84, aaMet:0.49, aaPhe:1.17, aaThr:0.87, aaTrp:0.30, aaVal:1.17, iron:5.3,  calc:78,  zinc:5.0, b12:0,    vitD:0,   omega3:0.07, iod:0,  sel:53.0, mag:325, pot:645,  fol:227 },
{ id:"cashews",        name:"Cashews",                  cat:"Nuts & Seeds", cal:553, pro:18.2, carb:30.2, fat:43.9, fib:3.3,  fibSol:0.6,  fibInsol:2.7,  fatSat:7.8,  fatMufa:23.8, fatPufa:7.8,  aaHis:0.44, aaIle:0.79, aaLeu:1.47, aaLys:0.93, aaMet:0.36, aaPhe:0.95, aaThr:0.69, aaTrp:0.27, aaVal:1.10, iron:6.7,  calc:37,  zinc:5.8, b12:0,    vitD:0,   omega3:0.16, iod:0,  sel:19.9, mag:292, pot:660,  fol:25  },
{ id:"walnuts",        name:"Walnuts",                  cat:"Nuts & Seeds", cal:654, pro:15.2, carb:13.7, fat:65.2, fib:6.7,  fibSol:1.3,  fibInsol:5.4,  fatSat:6.1,  fatMufa:8.9,  fatPufa:47.2, aaHis:0.39, aaIle:0.67, aaLeu:1.17, aaLys:0.42, aaMet:0.24, aaPhe:0.71, aaThr:0.59, aaTrp:0.17, aaVal:0.75, iron:2.9,  calc:98,  zinc:3.1, b12:0,    vitD:0,   omega3:9.08, iod:0,  sel:4.9,  mag:158, pot:441,  fol:98  },
{ id:"sesame_seeds",   name:"Sesame Seeds",             cat:"Nuts & Seeds", cal:573, pro:17.7, carb:23.5, fat:49.7, fib:11.8, fibSol:1.6,  fibInsol:10.2, fatSat:7.0,  fatMufa:18.8, fatPufa:21.8, aaHis:0.52, aaIle:0.74, aaLeu:1.36, aaLys:0.37, aaMet:0.59, aaPhe:0.93, aaThr:0.73, aaTrp:0.30, aaVal:0.98, iron:14.6, calc:975, zinc:7.8, b12:0,    vitD:0,   omega3:0.38, iod:0,  sel:34.4, mag:351, pot:468,  fol:97  },
{ id:"tahini",         name:"Tahini",                   cat:"Nuts & Seeds", cal:595, pro:17.0, carb:21.2, fat:53.8, fib:9.3,  fibSol:1.3,  fibInsol:8.0,  fatSat:7.5,  fatMufa:20.7, fatPufa:23.6, aaHis:0.48, aaIle:0.68, aaLeu:1.26, aaLys:0.34, aaMet:0.54, aaPhe:0.86, aaThr:0.68, aaTrp:0.28, aaVal:0.91, iron:8.9,  calc:426, zinc:4.6, b12:0,    vitD:0,   omega3:0.39, iod:0,  sel:34.4, mag:95,  pot:414,  fol:98  },
{ id:"broccoli",       name:"Broccoli (raw)",           cat:"Vegetables",   cal:34,  pro:2.8,  carb:6.6,  fat:0.4,  fib:2.6,  fibSol:0.9,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.05, aaIle:0.07, aaLeu:0.11, aaLys:0.13, aaMet:0.03, aaPhe:0.10, aaThr:0.08, aaTrp:0.03, aaVal:0.11, iron:0.7,  calc:47,  zinc:0.4, b12:0,    vitD:0,   omega3:0.17, iod:0,  sel:2.5,  mag:21,  pot:316,  fol:63  },
{ id:"spinach",        name:"Spinach (raw)",            cat:"Vegetables",   cal:23,  pro:2.9,  carb:3.6,  fat:0.4,  fib:2.2,  fibSol:0.5,  fibInsol:1.7,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.06, aaIle:0.10, aaLeu:0.16, aaLys:0.17, aaMet:0.05, aaPhe:0.12, aaThr:0.10, aaTrp:0.04, aaVal:0.13, iron:2.7,  calc:99,  zinc:0.5, b12:0,    vitD:0,   omega3:0.14, iod:0,  sel:1.0,  mag:79,  pot:558,  fol:194 },
{ id:"kale",           name:"Kale (raw)",               cat:"Vegetables",   cal:49,  pro:4.3,  carb:8.8,  fat:0.9,  fib:3.6,  fibSol:0.5,  fibInsol:3.1,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.3,  aaHis:0.09, aaIle:0.13, aaLeu:0.19, aaLys:0.19, aaMet:0.04, aaPhe:0.14, aaThr:0.13, aaTrp:0.04, aaVal:0.14, iron:1.5,  calc:150, zinc:0.6, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:0.9,  mag:47,  pot:491,  fol:141 },
{ id:"sweet_potato",   name:"Sweet Potato (cooked)",   cat:"Vegetables",   cal:90,  pro:2.0,  carb:20.7, fat:0.1,  fib:3.3,  fibSol:1.1,  fibInsol:2.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.04, aaIle:0.06, aaLeu:0.09, aaLys:0.07, aaMet:0.02, aaPhe:0.09, aaThr:0.07, aaTrp:0.02, aaVal:0.09, iron:0.7,  calc:38,  zinc:0.3, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.6,  mag:27,  pot:475,  fol:6   },
{ id:"potato",         name:"Potato (cooked)",          cat:"Vegetables",   cal:87,  pro:1.9,  carb:20.1, fat:0.1,  fib:1.8,  fibSol:0.6,  fibInsol:1.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.04, aaIle:0.07, aaLeu:0.10, aaLys:0.11, aaMet:0.03, aaPhe:0.08, aaThr:0.07, aaTrp:0.02, aaVal:0.10, iron:0.3,  calc:5,   zinc:0.3, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.4,  mag:22,  pot:328,  fol:9   },
{ id:"tomato",         name:"Tomato (raw)",             cat:"Vegetables",   cal:18,  pro:0.9,  carb:3.9,  fat:0.2,  fib:1.2,  fibSol:0.3,  fibInsol:0.9,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.02, aaLeu:0.03, aaLys:0.03, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.03, iron:0.3,  calc:10,  zinc:0.2, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:0.4,  mag:11,  pot:237,  fol:15  },
{ id:"onion",          name:"Onion (raw)",              cat:"Vegetables",   cal:40,  pro:1.1,  carb:9.3,  fat:0.1,  fib:1.7,  fibSol:0.9,  fibInsol:0.8,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.03, aaLeu:0.04, aaLys:0.05, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.2,  calc:23,  zinc:0.2, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.5,  mag:10,  pot:146,  fol:19  },
{ id:"carrot",         name:"Carrot (raw)",             cat:"Vegetables",   cal:41,  pro:0.9,  carb:9.6,  fat:0.2,  fib:2.8,  fibSol:1.1,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.02, aaLeu:0.04, aaLys:0.04, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.3,  calc:33,  zinc:0.2, b12:0,    vitD:0,   omega3:0.002,iod:0,  sel:0.1,  mag:12,  pot:320,  fol:19  },
{ id:"avocado",        name:"Avocado",                  cat:"Vegetables",   cal:160, pro:2.0,  carb:8.5,  fat:14.7, fib:6.7,  fibSol:2.1,  fibInsol:4.6,  fatSat:2.1,  fatMufa:9.8,  fatPufa:1.8,  aaHis:0.05, aaIle:0.07, aaLeu:0.12, aaLys:0.13, aaMet:0.04, aaPhe:0.10, aaThr:0.07, aaTrp:0.02, aaVal:0.10, iron:0.6,  calc:12,  zinc:0.6, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:0.4,  mag:29,  pot:485,  fol:81  },
{ id:"bell_pepper",    name:"Bell Pepper (raw)",        cat:"Vegetables",   cal:26,  pro:1.0,  carb:6.0,  fat:0.2,  fib:2.1,  fibSol:0.6,  fibInsol:1.5,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.03, aaLeu:0.04, aaLys:0.05, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.4,  calc:7,   zinc:0.1, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:0.1,  mag:10,  pot:211,  fol:46  },
{ id:"corn",           name:"Corn (cooked)",            cat:"Vegetables",   cal:96,  pro:3.4,  carb:21.0, fat:1.5,  fib:2.4,  fibSol:0.2,  fibInsol:2.2,  fatSat:0.2,  fatMufa:0.4,  fatPufa:0.7,  aaHis:0.09, aaIle:0.11, aaLeu:0.35, aaLys:0.10, aaMet:0.07, aaPhe:0.15, aaThr:0.12, aaTrp:0.02, aaVal:0.16, iron:0.5,  calc:2,   zinc:0.5, b12:0,    vitD:0,   omega3:0.02, iod:0,  sel:0.6,  mag:26,  pot:270,  fol:46  },
{ id:"cassava",        name:"Cassava (cooked)",         cat:"Vegetables",   cal:160, pro:1.4,  carb:38.1, fat:0.3,  fib:1.8,  fibSol:0.4,  fibInsol:1.4,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.03, aaIle:0.05, aaLeu:0.07, aaLys:0.06, aaMet:0.02, aaPhe:0.05, aaThr:0.05, aaTrp:0.02, aaVal:0.06, iron:0.3,  calc:16,  zinc:0.3, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.7,  mag:21,  pot:271,  fol:27  },
{ id:"plantain",       name:"Plantain (cooked)",        cat:"Vegetables",   cal:122, pro:0.8,  carb:31.9, fat:0.1,  fib:2.3,  fibSol:0.6,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.03, aaLeu:0.05, aaLys:0.05, aaMet:0.02, aaPhe:0.04, aaThr:0.03, aaTrp:0.01, aaVal:0.05, iron:0.6,  calc:3,   zinc:0.1, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:1.5,  mag:32,  pot:465,  fol:23  },
{ id:"banana",         name:"Banana",                   cat:"Fruits",       cal:89,  pro:1.1,  carb:22.8, fat:0.3,  fib:2.6,  fibSol:0.7,  fibInsol:1.9,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.09, aaIle:0.03, aaLeu:0.07, aaLys:0.05, aaMet:0.01, aaPhe:0.05, aaThr:0.03, aaTrp:0.01, aaVal:0.05, iron:0.3,  calc:5,   zinc:0.2, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:1.0,  mag:27,  pot:358,  fol:20  },
{ id:"orange",         name:"Orange",                   cat:"Fruits",       cal:47,  pro:0.9,  carb:11.8, fat:0.1,  fib:2.4,  fibSol:1.2,  fibInsol:1.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.02, aaLeu:0.03, aaLys:0.05, aaMet:0.02, aaPhe:0.03, aaThr:0.02, aaTrp:0.01, aaVal:0.04, iron:0.1,  calc:40,  zinc:0.1, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.5,  mag:10,  pot:181,  fol:30  },
{ id:"mango",          name:"Mango",                    cat:"Fruits",       cal:60,  pro:0.8,  carb:15.0, fat:0.4,  fib:1.6,  fibSol:0.6,  fibInsol:1.0,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.02, aaIle:0.03, aaLeu:0.05, aaLys:0.07, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.2,  calc:11,  zinc:0.1, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:0.6,  mag:10,  pot:168,  fol:43  },
{ id:"papaya",         name:"Papaya",                   cat:"Fruits",       cal:43,  pro:0.5,  carb:10.8, fat:0.3,  fib:1.7,  fibSol:0.7,  fibInsol:1.0,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.01, aaIle:0.01, aaLeu:0.02, aaLys:0.03, aaMet:0.01, aaPhe:0.02, aaThr:0.02, aaTrp:0.01, aaVal:0.02, iron:0.3,  calc:24,  zinc:0.1, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.6,  mag:21,  pot:182,  fol:37  },
{ id:"apple",          name:"Apple",                    cat:"Fruits",       cal:52,  pro:0.3,  carb:13.8, fat:0.2,  fib:2.4,  fibSol:1.0,  fibInsol:1.4,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.01, aaIle:0.01, aaLeu:0.01, aaLys:0.02, aaMet:0.00, aaPhe:0.01, aaThr:0.01, aaTrp:0.00, aaVal:0.01, iron:0.1,  calc:6,   zinc:0.04,b12:0,    vitD:0,   omega3:0.009,iod:0,  sel:0.02, mag:5,   pot:107,  fol:3   },
{ id:"dates",          name:"Dates (dried)",            cat:"Fruits",       cal:277, pro:1.8,  carb:75.0, fat:0.2,  fib:6.7,  fibSol:1.0,  fibInsol:5.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.05, aaIle:0.06, aaLeu:0.11, aaLys:0.07, aaMet:0.02, aaPhe:0.08, aaThr:0.06, aaTrp:0.01, aaVal:0.09, iron:0.9,  calc:39,  zinc:0.4, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:3.0,  mag:54,  pot:696,  fol:15  },
{ id:"oat_milk",       name:"Oat Milk",                 cat:"Dairy Alt",    cal:43,  pro:1.0,  carb:7.0,  fat:1.5,  fib:0.8,  fibSol:0.5,  fibInsol:0.3,  fatSat:0.2,  fatMufa:0.7,  fatPufa:0.4,  aaHis:0.03, aaIle:0.04, aaLeu:0.07, aaLys:0.04, aaMet:0.02, aaPhe:0.05, aaThr:0.03, aaTrp:0.02, aaVal:0.05, iron:0.2,  calc:120, zinc:0.1, b12:0.4,  vitD:1.0, omega3:0.05, iod:5,  sel:0.5,  mag:10,  pot:62,   fol:5   },
{ id:"soy_milk",       name:"Soy Milk",                 cat:"Dairy Alt",    cal:54,  pro:3.3,  carb:6.3,  fat:1.8,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.3,  fatMufa:0.4,  fatPufa:1.0,  aaHis:0.09, aaIle:0.15, aaLeu:0.26, aaLys:0.21, aaMet:0.05, aaPhe:0.17, aaThr:0.13, aaTrp:0.04, aaVal:0.16, iron:0.5,  calc:120, zinc:0.2, b12:0.6,  vitD:1.0, omega3:0.25, iod:5,  sel:2.5,  mag:19,  pot:118,  fol:18  },
{ id:"soy_cream",      name:"Soy Cream",                cat:"Dairy Alt",    cal:100, pro:1.5,  carb:5.0,  fat:8.0,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:1.2,  fatMufa:1.8,  fatPufa:4.4,  aaHis:0.04, aaIle:0.06, aaLeu:0.12, aaLys:0.09, aaMet:0.02, aaPhe:0.08, aaThr:0.06, aaTrp:0.02, aaVal:0.07, iron:0.1,  calc:15,  zinc:0.1, b12:0.3,  vitD:0,   omega3:0.1,  iod:0,  sel:0.5,  mag:5,   pot:60,   fol:2   },
{ id:"coconut_milk",   name:"Coconut Milk (canned)",    cat:"Dairy Alt",    cal:197, pro:2.3,  carb:5.5,  fat:19.4, fib:0,    fibSol:0,    fibInsol:0,    fatSat:17.2, fatMufa:0.8,  fatPufa:0.2,  aaHis:0.06, aaIle:0.09, aaLeu:0.17, aaLys:0.14, aaMet:0.05, aaPhe:0.12, aaThr:0.09, aaTrp:0.02, aaVal:0.14, iron:1.6,  calc:16,  zinc:0.7, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:6.2,  mag:37,  pot:263,  fol:16  },
{ id:"soy_yogurt",     name:"Soy Yogurt (plain)",       cat:"Dairy Alt",    cal:60,  pro:3.0,  carb:7.0,  fat:2.0,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.3,  fatMufa:0.5,  fatPufa:1.1,  aaHis:0.08, aaIle:0.13, aaLeu:0.23, aaLys:0.18, aaMet:0.04, aaPhe:0.15, aaThr:0.11, aaTrp:0.04, aaVal:0.14, iron:0.4,  calc:120, zinc:0.3, b12:0.5,  vitD:1.0, omega3:0.1,  iod:5,  sel:2.0,  mag:17,  pot:141,  fol:9   },
{ id:"olive_oil",      name:"Olive Oil",                cat:"Oils",         cal:884, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:13.8, fatMufa:73.0, fatPufa:10.5, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6,  calc:1,   zinc:0,   b12:0,    vitD:0,   omega3:0.76, iod:0,  sel:0,    mag:0,   pot:1,    fol:0   },
{ id:"sunflower_oil",  name:"Sunflower Oil",            cat:"Oils",         cal:884, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:10.1, fatMufa:19.5, fatPufa:65.7, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0.21, iod:0,  sel:0,    mag:0,   pot:0,    fol:0   },
{ id:"coconut_oil",    name:"Coconut Oil",              cat:"Oils",         cal:862, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:82.5, fatMufa:6.3,  fatPufa:1.7,  aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0,    mag:0,   pot:0,    fol:0   },
{ id:"nooch",          name:"Nutritional Yeast",        cat:"Other",        cal:325, pro:50.0, carb:25.0, fat:7.5,  fib:7.0,  fibSol:2.3,  fibInsol:4.7,  fatSat:1.1,  fatMufa:1.0,  fatPufa:4.6,  aaHis:1.05, aaIle:2.26, aaLeu:3.71, aaLys:3.21, aaMet:0.73, aaPhe:2.14, aaThr:2.30, aaTrp:0.60, aaVal:2.68, iron:6.0,  calc:30,  zinc:6.0, b12:24.0, vitD:0,   omega3:0,    iod:0,  sel:100,  mag:231, pot:1000, fol:1270},
{ id:"sugar_brown",    name:"Brown Sugar",              cat:"Other",        cal:380, pro:0.1,  carb:97.3, fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9,  calc:83,  zinc:0.2, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:1.2,  mag:29,  pot:346,  fol:1   },
{ id:"sugar_white",    name:"White Sugar",              cat:"Other",        cal:387, pro:0,    carb:100,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1,  calc:1,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.6,  mag:0,   pot:2,    fol:0   },
{ id:"cornstarch",     name:"Cornstarch",               cat:"Other",        cal:381, pro:0.3,  carb:91.3, fat:0.1,  fib:0.9,  fibSol:0.3,  fibInsol:0.6,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5,  calc:2,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:4.5,  mag:3,   pot:3,    fol:0   },
{ id:"vanilla_extract",name:"Vanilla Essence",          cat:"Other",        cal:288, pro:0.1,  carb:12.7, fat:0.1,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1,  calc:11,  zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0,    mag:12,  pot:148,  fol:0   },
{ id:"soy_sauce",      name:"Soy Sauce",                cat:"Other",        cal:53,  pro:8.1,  carb:4.9,  fat:0.6,  fib:0.8,  fibSol:0.3,  fibInsol:0.5,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.3,  aaHis:0.18, aaIle:0.24, aaLeu:0.47, aaLys:0.30, aaMet:0.08, aaPhe:0.30, aaThr:0.24, aaTrp:0.07, aaVal:0.28, iron:2.4,  calc:20,  zinc:0.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:0.3,  mag:40,  pot:435,  fol:18  },
{ id:"jam",            name:"Jam (fruit)",              cat:"Other",        cal:250, pro:0.4,  carb:65.0, fat:0.1,  fib:1.0,  fibSol:0.4,  fibInsol:0.6,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0, aaIle:0, aaLeu:0.01, aaLys:0.01, aaMet:0, aaPhe:0.01, aaThr:0.01, aaTrp:0, aaVal:0.01, iron:0.6,  calc:20,  zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.5,  mag:5,   pot:88,   fol:3   },
{ id:"ketchup",        name:"Ketchup",                  cat:"Other",        cal:100, pro:1.7,  carb:23.0, fat:0.4,  fib:0.5,  fibSol:0.2,  fibInsol:0.3,  fatSat:0.0,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.02, aaIle:0.02, aaLeu:0.04, aaLys:0.05, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.5,  calc:14,  zinc:0.2, b12:0,    vitD:0,   omega3:0.02, iod:0,  sel:0.9,  mag:12,  pot:270,  fol:15  },
{ id:"vegan_mayo",     name:"Vegan Mayonnaise",         cat:"Other",        cal:650, pro:0.5,  carb:4.0,  fat:72.0, fib:0,    fibSol:0,    fibInsol:0,    fatSat:6.5,  fatMufa:20.0, fatPufa:41.5, aaHis:0, aaIle:0, aaLeu:0.01, aaLys:0.01, aaMet:0, aaPhe:0.01, aaThr:0.01, aaTrp:0, aaVal:0.01, iron:0.1,  calc:10,  zinc:0.1, b12:0,    vitD:0,   omega3:0.5,  iod:0,  sel:0.3,  mag:2,   pot:40,   fol:2   },
{ id:"cornflakes",     name:"Cornflakes",               cat:"Packaged",     cal:375, pro:7.0,  carb:84.0, fat:0.4,  fib:3.0,  fibSol:0.7,  fibInsol:2.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.18, aaIle:0.27, aaLeu:0.90, aaLys:0.19, aaMet:0.14, aaPhe:0.38, aaThr:0.24, aaTrp:0.07, aaVal:0.40, iron:8.0,  calc:6,   zinc:1.5, b12:1.0,  vitD:2.1, omega3:0,    iod:5,  sel:4.0,  mag:22,  pot:100,  fol:140 },
{ id:"muesli",         name:"Muesli",                   cat:"Packaged",     cal:350, pro:10.0, carb:62.0, fat:7.0,  fib:8.0,  fibSol:2.7,  fibInsol:5.3,  fatSat:1.2,  fatMufa:2.6,  fatPufa:2.7,  aaHis:0.26, aaIle:0.42, aaLeu:0.87, aaLys:0.36, aaMet:0.19, aaPhe:0.57, aaThr:0.36, aaTrp:0.12, aaVal:0.55, iron:4.5,  calc:80,  zinc:2.5, b12:0,    vitD:0,   omega3:0.15, iod:0,  sel:8.0,  mag:100, pot:370,  fol:50  },
{ id:"granola",        name:"Granola",                  cat:"Packaged",     cal:471, pro:10.0, carb:64.0, fat:20.0, fib:6.7,  fibSol:2.2,  fibInsol:4.5,  fatSat:3.5,  fatMufa:8.2,  fatPufa:6.8,  aaHis:0.25, aaIle:0.38, aaLeu:0.80, aaLys:0.34, aaMet:0.18, aaPhe:0.51, aaThr:0.34, aaTrp:0.11, aaVal:0.51, iron:3.8,  calc:52,  zinc:2.1, b12:0,    vitD:0,   omega3:0.08, iod:0,  sel:14.0, mag:91,  pot:289,  fol:44  },
{ id:"bread_white",    name:"White Bread",              cat:"Packaged",     cal:265, pro:9.0,  carb:49.0, fat:3.2,  fib:2.7,  fibSol:0.5,  fibInsol:2.2,  fatSat:0.7,  fatMufa:0.6,  fatPufa:1.4,  aaHis:0.20, aaIle:0.31, aaLeu:0.65, aaLys:0.22, aaMet:0.15, aaPhe:0.44, aaThr:0.25, aaTrp:0.09, aaVal:0.37, iron:2.9,  calc:151, zinc:0.6, b12:0,    vitD:0,   omega3:0.15, iod:15, sel:21.0, mag:21,  pot:115,  fol:50  },
{ id:"bread_roll",     name:"Bread Roll (white)",       cat:"Packaged",     cal:285, pro:9.2,  carb:55.0, fat:2.5,  fib:2.0,  fibSol:0.5,  fibInsol:1.5,  fatSat:0.5,  fatMufa:0.5,  fatPufa:1.1,  aaHis:0.22, aaIle:0.33, aaLeu:0.70, aaLys:0.24, aaMet:0.16, aaPhe:0.48, aaThr:0.27, aaTrp:0.10, aaVal:0.40, iron:2.5,  calc:120, zinc:0.6, b12:0,    vitD:0,   omega3:0.1,  iod:12, sel:18.0, mag:20,  pot:100,  fol:40  },
{ id:"pizza_base",     name:"Pizza Base (thin)",        cat:"Packaged",     cal:265, pro:8.0,  carb:50.0, fat:3.5,  fib:2.2,  fibSol:0.5,  fibInsol:1.7,  fatSat:0.5,  fatMufa:0.8,  fatPufa:1.6,  aaHis:0.19, aaIle:0.28, aaLeu:0.59, aaLys:0.21, aaMet:0.14, aaPhe:0.41, aaThr:0.23, aaTrp:0.08, aaVal:0.33, iron:1.5,  calc:15,  zinc:0.6, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:20.0, mag:18,  pot:85,   fol:15  },
{ id:"rice_cakes",     name:"Rice Cakes (plain)",       cat:"Packaged",     cal:387, pro:7.9,  carb:80.2, fat:2.8,  fib:3.5,  fibSol:0.5,  fibInsol:3.0,  fatSat:0.6,  fatMufa:1.0,  fatPufa:1.0,  aaHis:0.20, aaIle:0.32, aaLeu:0.63, aaLys:0.28, aaMet:0.19, aaPhe:0.39, aaThr:0.28, aaTrp:0.09, aaVal:0.49, iron:0.7,  calc:5,   zinc:1.4, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:13.5, mag:42,  pot:105,  fol:4   },
{ id:"tortilla_chips", name:"Tortilla Chips",           cat:"Packaged",     cal:503, pro:7.0,  carb:63.0, fat:24.0, fib:4.5,  fibSol:0.8,  fibInsol:3.7,  fatSat:3.4,  fatMufa:7.1,  fatPufa:11.5, aaHis:0.18, aaIle:0.22, aaLeu:0.72, aaLys:0.19, aaMet:0.11, aaPhe:0.31, aaThr:0.21, aaTrp:0.04, aaVal:0.31, iron:1.3,  calc:100, zinc:1.0, b12:0,    vitD:0,   omega3:0.2,  iod:0,  sel:9.0,  mag:58,  pot:202,  fol:23  },
{ id:"crisps",         name:"Potato Crisps",            cat:"Packaged",     cal:536, pro:7.0,  carb:53.0, fat:33.0, fib:4.8,  fibSol:0.9,  fibInsol:3.9,  fatSat:3.1,  fatMufa:7.4,  fatPufa:20.9, aaHis:0.15, aaIle:0.25, aaLeu:0.36, aaLys:0.40, aaMet:0.11, aaPhe:0.27, aaThr:0.24, aaTrp:0.07, aaVal:0.32, iron:1.5,  calc:25,  zinc:0.8, b12:0,    vitD:0,   omega3:0.08, iod:0,  sel:3.0,  mag:50,  pot:1642, fol:18  },
{ id:"instant_noodles",name:"Instant Noodles",          cat:"Packaged",     cal:450, pro:9.0,  carb:64.0, fat:17.0, fib:2.0,  fibSol:0.5,  fibInsol:1.5,  fatSat:7.7,  fatMufa:6.3,  fatPufa:2.0,  aaHis:0.21, aaIle:0.33, aaLeu:0.70, aaLys:0.27, aaMet:0.15, aaPhe:0.46, aaThr:0.30, aaTrp:0.09, aaVal:0.43, iron:1.5,  calc:20,  zinc:0.5, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:15.0, mag:20,  pot:90,   fol:10  },
{ id:"dark_chocolate", name:"Dark Chocolate (70%+)",    cat:"Packaged",     cal:600, pro:7.8,  carb:45.8, fat:42.6, fib:10.9, fibSol:1.8,  fibInsol:9.1,  fatSat:24.5, fatMufa:13.2, fatPufa:1.3,  aaHis:0.20, aaIle:0.27, aaLeu:0.49, aaLys:0.31, aaMet:0.09, aaPhe:0.38, aaThr:0.26, aaTrp:0.13, aaVal:0.40, iron:11.9, calc:73,  zinc:3.3, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:6.8,  mag:228, pot:715,  fol:18  },
{ id:"digestives",     name:"Digestive Biscuits",       cat:"Packaged",     cal:480, pro:7.0,  carb:64.0, fat:22.0, fib:3.5,  fibSol:0.9,  fibInsol:2.6,  fatSat:9.5,  fatMufa:7.4,  fatPufa:3.5,  aaHis:0.17, aaIle:0.26, aaLeu:0.55, aaLys:0.18, aaMet:0.12, aaPhe:0.37, aaThr:0.21, aaTrp:0.08, aaVal:0.31, iron:2.0,  calc:70,  zinc:0.9, b12:0,    vitD:0,   omega3:0.1,  iod:0,  sel:15.0, mag:35,  pot:210,  fol:30  },
{ id:"oreos",          name:"Oreos",                    cat:"Packaged",     cal:480, pro:4.5,  carb:71.0, fat:20.0, fib:2.0,  fibSol:0.5,  fibInsol:1.5,  fatSat:5.0,  fatMufa:9.0,  fatPufa:5.0,  aaHis:0.10, aaIle:0.15, aaLeu:0.33, aaLys:0.11, aaMet:0.07, aaPhe:0.22, aaThr:0.13, aaTrp:0.05, aaVal:0.18, iron:4.5,  calc:15,  zinc:0.4, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:3.0,  mag:20,  pot:170,  fol:10  },
{ id:"protein_powder", name:"Vegan Protein Powder",     cat:"Packaged",     cal:380, pro:75.0, carb:10.0, fat:5.0,  fib:3.0,  fibSol:1.0,  fibInsol:2.0,  fatSat:1.0,  fatMufa:1.5,  fatPufa:2.0,  aaHis:1.68, aaIle:3.41, aaLeu:6.05, aaLys:4.27, aaMet:0.87, aaPhe:3.72, aaThr:2.87, aaTrp:0.84, aaVal:3.74, iron:5.0,  calc:100, zinc:3.0, b12:1.5,  vitD:0,   omega3:0,    iod:0,  sel:10.0, mag:60,  pot:300,  fol:60  },
{ id:"red_wine",       name:"Red Wine (per 100ml)",      cat:"Alcohol",     cal:85,  pro:0.1,  carb:2.6,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5,  calc:8,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.2,  mag:12,  pot:127,  fol:1   },
{ id:"white_wine",     name:"White Wine (per 100ml)",    cat:"Alcohol",     cal:82,  pro:0.1,  carb:2.6,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3,  calc:9,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.1,  mag:10,  pot:71,   fol:0   },
{ id:"beer_lager",     name:"Beer / Lager (per 100ml)",  cat:"Alcohol",     cal:43,  pro:0.5,  carb:3.5,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:4,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.6,  mag:6,   pot:27,   fol:6   },
{ id:"spirit",         name:"Spirit 40% ABV (per 100ml)",cat:"Alcohol",     cal:231, pro:0,    carb:0,    fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0,    mag:0,   pot:2,    fol:0   },
];

// ── WORKER CONFIG ─────────────────────────────────────────────────────────
// Cloudflare Worker proxy for Notion API. Worker holds the Notion token and
// recipe database ID in env vars; PWA only needs the URL + the shared-secret
// header value. The auth secret in client code is a deterrent for casual abuse,
// not real security — the real protection is the Worker's narrow read-only
// scope. See NutriTrack_Phase5b_Handover.md.
const WORKER_URL          = "https://nutritrack-proxy.nickkropf.workers.dev";
const WORKER_AUTH_SECRET  = "zmUwkF!69UbvTPah64pFKCXd$3vZ#LzP";
// Per-page concurrency for the recipe-page fetch loop. The Worker makes 2
// Notion calls per page; Notion's documented rate limit is ~3 req/s avg.
// Concurrency 3 keeps us comfortably below that with retry headroom.
const WORKER_FETCH_CONCURRENCY = 3;

// ── UNIT CONVERSION ───────────────────────────────────────────────────────
// ml treated as g at 1:1 — sufficient approximation for recipe logging
const UNIT_TO_G = {
  g:1, gram:1, grams:1, kg:1000,
  ml:1, milliliter:1, millilitre:1, milliliters:1, millilitres:1,
  l:1000, liter:1, litre:1, liters:1, litres:1,
  tsp:5, teaspoon:5, teaspoons:5,
  tbsp:15, tablespoon:15, tablespoons:15,
  cup:240, cups:240,
  whole:1, piece:1, pinch:1,
};
function toGrams(amount, unit) {
  const factor = UNIT_TO_G[(unit||"g").toLowerCase()] ?? 1;
  return Math.round(amount * factor * 10) / 10;
}

// ── FUZZY FOOD MATCHING ───────────────────────────────────────────────────
function fuzzyMatchFood(name, allFoods) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  // Exact match
  let m = allFoods.find(f => f.name.toLowerCase() === n);
  if (m) return m;
  // Food name starts with ingredient name
  m = allFoods.find(f => f.name.toLowerCase().startsWith(n) && n.length > 3);
  if (m) return m;
  // Ingredient name includes start of food name (strip parentheticals)
  m = allFoods.find(f => {
    const base = f.name.toLowerCase().split(" (")[0];
    return base.length > 3 && n.includes(base);
  });
  if (m) return m;
  // Food name contains ingredient name
  m = allFoods.find(f => f.name.toLowerCase().includes(n) && n.length > 3);
  if (m) return m;
  // All significant words of food name appear in ingredient name
  m = allFoods.find(f => {
    const SKIP = new Set(["dry","cooked","raw","ground","firm","plain","canned","rolled","per","100ml","abv"]);
    const words = f.name.toLowerCase().replace(/[()]/g,"").split(" ").filter(w => w.length > 3 && !SKIP.has(w));
    return words.length >= 1 && words.every(w => n.includes(w));
  });
  return m || null;
}

// ── WORKER API FETCHERS ───────────────────────────────────────────────────
// All requests go through the Cloudflare Worker. The Worker enforces origin +
// shared-secret auth, then proxies read-only calls to Notion. See worker.js.

function workerHeaders() {
  return {
    "Content-Type":       "application/json",
    "X-NutriTrack-Auth":  WORKER_AUTH_SECRET,
  };
}

// Wraps fetch errors into a uniform shape so callers can surface useful messages.
async function workerFetch(path, init) {
  let res;
  try {
    res = await fetch(`${WORKER_URL}${path}`, init);
  } catch (e) {
    // Network error before any HTTP status — treat as transport failure
    throw new Error(`network: ${e.message || "fetch failed"}`);
  }
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON body */ }
  if (!res.ok) {
    const reason = (data && (data.reason || data.error || data.detail)) || `http_${res.status}`;
    throw new Error(`worker_${res.status}: ${reason}`);
  }
  return data;
}

// GET /health — used by Test Connection button. Returns { status, version }
// when origin + auth are accepted, otherwise throws.
async function fetchHealth() {
  return workerFetch("/health", { method: "GET", headers: workerHeaders() });
}

// POST /recipes/list — fetches metadata for all recipes (or only those edited
// after `since` if provided). Returns { recipes: [...], fetched_at, count }.
// Each recipe: { id, title, servings, source, last_edited_time }.
async function fetchRecipesList(since) {
  const body = since ? { since } : {};
  return workerFetch("/recipes/list", {
    method:  "POST",
    headers: workerHeaders(),
    body:    JSON.stringify(body),
  });
}

// POST /recipes/page — fetches ingredient lines for one recipe page.
// Returns { page_id, ingredientLines: [...], warning? }.
async function fetchRecipePage(pageId) {
  return workerFetch("/recipes/page", {
    method:  "POST",
    headers: workerHeaders(),
    body:    JSON.stringify({ page_id: pageId }),
  });
}

// Fetch ingredient lines for many recipes with bounded concurrency. Calls
// onProgress(completedCount) after each page resolves so the UI can update.
// Returns the list with each recipe enriched with an `ingredientLines` array.
// Recipes whose page fetch fails are returned with `error` set instead.
async function fetchRecipePagesWithProgress(recipes, onProgress) {
  const results = new Array(recipes.length);
  let cursor    = 0;
  let completed = 0;

  async function worker() {
    while (true) {
      const idx = cursor++;
      if (idx >= recipes.length) return;
      const r = recipes[idx];
      try {
        const data = await fetchRecipePage(r.id);
        results[idx] = {
          ...r,
          ingredientLines: data.ingredientLines || [],
          warning:         data.warning || null,
        };
      } catch (e) {
        results[idx] = { ...r, ingredientLines: [], error: e.message || "fetch failed" };
      }
      completed += 1;
      if (onProgress) onProgress(completed);
    }
  }

  const pool = Array.from({ length: Math.min(WORKER_FETCH_CONCURRENCY, recipes.length) }, () => worker());
  await Promise.all(pool);
  return results;
}

// ── CLAUDE API INGREDIENT PARSER ──────────────────────────────────────────
async function parseIngredientsWithClaude(ingredientLines) {
  if (!ingredientLines || ingredientLines.length === 0) return [];
  const prompt = `Parse these recipe ingredient strings into a JSON array.
Return ONLY the JSON array — no preamble, no markdown fences, no extra text.

Each object must have exactly three keys:
- "name": string — food name only, no quantities or units
- "amount": number — the numeric quantity
- "unit": string — one of: g, kg, ml, l, tsp, tbsp, cup, whole

Ingredients:
${ingredientLines.map((l,i) => `${i+1}. ${l}`).join("\n")}`;

  const res  = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role:"user", content:prompt }],
    }),
  });
  const data = await res.json();
  const text = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(text); } catch { return []; }
}

// ── CLAUDE API MULTI-RECIPE PASTE PARSER ──────────────────────────────────
async function parseRecipesFromPasteText(text) {
  const prompt = `The following text contains one or more recipes copied from Notion. Extract all recipes and return ONLY a JSON array — no preamble, no markdown fences.

Each recipe object must have:
- "title": string — recipe name
- "servings": number — number of servings (default 4 if not found)
- "source": string — URL or source if mentioned, else ""
- "ingredientLines": string array — each raw ingredient string as written (e.g. "50 g of flour", "1 tsp cornstarch")

Text:
${text.slice(0, 8000)}`;

  const res  = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role:"user", content:prompt }],
    }),
  });
  const data = await res.json();
  const out  = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(out); } catch { return []; }
}





const AA_EAR    = { aaHis:0.98, aaIle:1.40, aaLeu:2.73, aaLys:2.10, aaMet:0.73, aaPhe:0.98, aaThr:1.05, aaTrp:0.28, aaVal:1.82 };
const AA_LABELS = { aaHis:"Histidine", aaIle:"Isoleucine", aaLeu:"Leucine", aaLys:"Lysine", aaMet:"Methionine", aaPhe:"Phenylalanine", aaThr:"Threonine", aaTrp:"Tryptophan", aaVal:"Valine" };
const AA_KEYS   = ["aaHis","aaIle","aaLeu","aaLys","aaMet","aaPhe","aaThr","aaTrp","aaVal"];

const NUTRIENT_META = {
cal:    { label:"Calories",   unit:"kcal", color:"#F59E0B" },
pro:    { label:"Protein",    unit:"g",    color:"#3B82F6" },
carb:   { label:"Carbs",      unit:"g",    color:"#10B981" },
fat:    { label:"Fat",        unit:"g",    color:"#EF4444" },
fib:    { label:"Fibre",      unit:"g",    color:"#8B5CF6" },
iron:   { label:"Iron",       unit:"mg",   color:"#DC2626" },
calc:   { label:"Calcium",    unit:"mg",   color:"#94A3B8" },
zinc:   { label:"Zinc",       unit:"mg",   color:"#64748B" },
b12:    { label:"B12",        unit:"mcg",  color:"#E11D48" },
vitD:   { label:"Vitamin D",  unit:"mcg",  color:"#FBBF24" },
omega3: { label:"Omega-3",    unit:"g",    color:"#06B6D4" },
iod:    { label:"Iodine",     unit:"mcg",  color:"#7C3AED" },
sel:    { label:"Selenium",   unit:"mcg",  color:"#D97706" },
mag:    { label:"Magnesium",  unit:"mg",   color:"#059669" },
pot:    { label:"Potassium",  unit:"mg",   color:"#EA580C" },
fol:    { label:"Folate",     unit:"mcg",  color:"#16A34A" },
};

const DEFAULT_GOALS = {
cal:2800, pro:70, carb:400, fat:85, fib:38,
iron:18, calc:1000, zinc:11, b12:2.4, vitD:15,
omega3:1.6, iod:150, sel:55, mag:420, pot:3400, fol:400,
};
const DEFAULT_PROFILE  = { name:"", weightKg:"", age:"", sex:"" };
const DEFAULT_EX_RATIO = { carb:60, fat:20, pro:20 };

const EXERCISE_ACTIVITIES = [
{ id:"cycling_light",    label:"Cycling",  intensity:"Light",    met:5.8  },
{ id:"cycling_moderate", label:"Cycling",  intensity:"Moderate", met:8.0  },
{ id:"cycling_hard",     label:"Cycling",  intensity:"Hard",     met:10.0 },
{ id:"walking_easy",     label:"Walking",  intensity:"Easy",     met:2.8  },
{ id:"walking_brisk",    label:"Walking",  intensity:"Brisk",    met:3.8  },
{ id:"running_easy",     label:"Running",  intensity:"Easy",     met:8.0  },
{ id:"running_moderate", label:"Running",  intensity:"Moderate", met:10.0 },
{ id:"running_hard",     label:"Running",  intensity:"Hard",     met:12.0 },
];

const MACROS = ["cal","pro","carb","fat","fib"];
const MICROS = ["iron","calc","zinc","b12","vitD","omega3","iod","sel","mag","pot","fol"];
const MEALS  = ["Breakfast","Lunch","Dinner","Snack"];

const FIB_SOL_COLOR   = "#8B5CF6";
const FIB_INSOL_COLOR = "#94A3B8";
const FAT_SAT_COLOR   = "#EF4444";
const FAT_MUFA_COLOR  = "#F97316";
const FAT_PUFA_COLOR  = "#06B6D4";

const dateKey = (d) => d.toISOString().slice(0,10);
const today   = () => dateKey(new Date());

const STORAGE_KEYS = {
logs:         "nt-logs",
goals:        "nt-goals",
customFoods:  "nt-custom",
profile:      "nt-profile",
exRatio:      "nt-exratio",
recipes:      "nt-recipes",
notionStatus: "nt-notion-status",
syncQueue:    "nt-sync-queue",
};

async function loadData(key, fallback) {
try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : fallback; }
catch { return fallback; }
}
async function saveData(key, val) {
try { await window.storage.set(key, JSON.stringify(val)); } catch(e) { console.error(e); }
}

// ── RECIPE HELPERS ────────────────────────────────────────────────────────
function calcRecipeNutritionPerServing(ingredients, servings, allFoods) {
const t = {};
Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
ingredients.forEach(ing => {
const food = allFoods.find(f => f.id === ing.foodId);
if (!food) return;
const m = ing.amount_g / 100;
Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; });
});
const s = Math.max(parseFloat(servings) || 1, 0.1);
const ps = {};
Object.keys(t).forEach(k => ps[k] = t[k] / s);
return ps;
}

function computeEntryNutrition(derivedIngredients, allFoods) {
const t = {};
Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
(derivedIngredients || []).forEach(ing => {
const food = allFoods.find(f => f.id === ing.foodId);
if (!food) return;
const m = ing.amount_g / 100;
Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; });
});
return t;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────
function Ring({ value, max, size=52, stroke=5, color, children }) {
const r = (size - stroke) / 2;
const circ = 2 * Math.PI * r;
const pct  = Math.min(value / (max || 1), 1);
return (
<svg width={size} height={size} style={{ display:"block" }}>
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} strokeLinecap="round"
transform={`rotate(-90 ${size/2} ${size/2})`}
style={{ transition:"stroke-dashoffset 0.5s ease" }} />
{children}
</svg>
);
}

function SwipeableEntry({ children, onDelete }) {
const [offsetX, setOffsetX] = useState(0);
const startX = useRef(null);
const DEL = 60;
const onTouchStart = e => { startX.current = e.touches[0].clientX; };
const onTouchMove  = e => { if (startX.current===null) return; const dx=e.touches[0].clientX-startX.current; if(dx<0) setOffsetX(Math.max(dx,-DEL-20)); };
const onTouchEnd   = () => { setOffsetX(offsetX < -DEL ? -DEL : 0); startX.current=null; };
return (
<div style={{ position:"relative", overflow:"hidden" }}>
<div style={{ position:"absolute", right:0, top:0, bottom:0, width:DEL, background:"#ef4444",
display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"0 8px 8px 0" }}
onClick={() => { setOffsetX(0); onDelete(); }}>
<span style={{ color:"#fff", fontSize:18, fontWeight:700 }}>🗑</span>
</div>
<div style={{ transform:`translateX(${offsetX}px)`, transition:startX.current?"none":"transform 0.2s ease",
background:"#0a0f1a", position:"relative", zIndex:1 }}
onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
{children}
</div>
</div>
);
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function NutriTrack() {
const [view,            setView]            = useState("log");
const [logs,            setLogs]            = useState({});
const [goals,           setGoals]           = useState(DEFAULT_GOALS);
const [customFoods,     setCustomFoods]     = useState([]);
const [profile,         setProfile]         = useState(DEFAULT_PROFILE);
const [exRatio,         setExRatio]         = useState(DEFAULT_EX_RATIO);
const [recipes,         setRecipes]         = useState([]);
const [currentDate,     setCurrentDate]     = useState(today());
const [loaded,          setLoaded]          = useState(false);
// Notion sync state
const [lastSyncedAt,    setLastSyncedAt]    = useState(null);
const [syncQueue,       setSyncQueue]       = useState([]);
const [notionSyncMsg,   setNotionSyncMsg]   = useState(null); // { type: 'info'|'error', text }
const [syncInProgress,  setSyncInProgress]  = useState(false);
// syncProgress: null when idle; otherwise { phase, current, total }
// phase: 'connecting' | 'listing' | 'fetching' | 'parsing'
const [syncProgress,    setSyncProgress]    = useState(null);
const [syncReviewData,  setSyncReviewData]  = useState([]);
const [pasteText,       setPasteText]       = useState("");
const [notionIngPick,   setNotionIngPick]   = useState(null);  // { recipeIdx, ingIdx }
const [notionIngSearch, setNotionIngSearch] = useState("");
// food add/edit
const [searchTerm,      setSearchTerm]      = useState("");
const [selectedFood,    setSelectedFood]    = useState(null);
const [amount,          setAmount]          = useState("100");
const [meal,            setMeal]            = useState("Breakfast");
const [editingEntryId,  setEditingEntryId]  = useState(null);
const [detailNutrient,  setDetailNutrient]  = useState(null);
// exercise
const [exActivity,      setExActivity]      = useState(EXERCISE_ACTIVITIES[0].id);
const [exDuration,      setExDuration]      = useState("60");
const [exBurnEdit,      setExBurnEdit]      = useState("");
// custom food
const [cf, setCf] = useState({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });
// recipe creation
const [recipeInProgress, setRecipeInProgress] = useState({ name:"", source:"", servings:"4", ingredients:[] });
const [editingRecipeId,  setEditingRecipeId]  = useState(null);
const [recipeIngSearch,  setRecipeIngSearch]  = useState("");
const [recipeIngSelected,setRecipeIngSelected]= useState(null);
const [recipeIngAmount,  setRecipeIngAmount]  = useState("100");
// recipe log
const [selectedRecipe,   setSelectedRecipe]   = useState(null);
const [recipeLogMode,    setRecipeLogMode]    = useState("servings");
const [recipeLogServings,setRecipeLogServings]= useState("1");
const [recipeLogGrams,   setRecipeLogGrams]   = useState("");
const [recipeLogMeal,    setRecipeLogMeal]    = useState("Breakfast");
const [recipeLogReturn,  setRecipeLogReturn]  = useState("recipeDetail");

const searchRef    = useRef(null);
const recipeIngRef = useRef(null);

useEffect(() => {
(async () => {
const l  = await loadData(STORAGE_KEYS.logs,         {});
const g  = await loadData(STORAGE_KEYS.goals,        DEFAULT_GOALS);
const c  = await loadData(STORAGE_KEYS.customFoods,  []);
const p  = await loadData(STORAGE_KEYS.profile,      DEFAULT_PROFILE);
const er = await loadData(STORAGE_KEYS.exRatio,      DEFAULT_EX_RATIO);
const rc = await loadData(STORAGE_KEYS.recipes,      []);
const ns = await loadData(STORAGE_KEYS.notionStatus, { lastSyncedAt: null });
const sq = await loadData(STORAGE_KEYS.syncQueue,    []);
setLogs(l); setGoals(g); setCustomFoods(c); setProfile(p); setExRatio(er); setRecipes(rc);
setLastSyncedAt(ns.lastSyncedAt);
setSyncQueue(sq);
setLoaded(true);
})();
}, []);

useEffect(() => { if (loaded) saveData(STORAGE_KEYS.logs,         logs);        }, [logs,        loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.goals,        goals);       }, [goals,       loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.customFoods,  customFoods); }, [customFoods, loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.profile,      profile);     }, [profile,     loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.exRatio,      exRatio);     }, [exRatio,     loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.recipes,      recipes);     }, [recipes,     loaded]);
useEffect(() => { if (loaded) saveData(STORAGE_KEYS.syncQueue,    syncQueue);   }, [syncQueue,   loaded]);

const allFoods = [...FOOD_DB, ...customFoods];
const dayLog   = logs[currentDate] || [];

const dailyTotals = useCallback(() => {
const t = {};
Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
dayLog.forEach(e => {
if (e.type === "exercise") return;
if (e.type === "recipe") {
(e.derivedIngredients || []).forEach(ing => {
const food = allFoods.find(f => f.id === ing.foodId);
if (!food) return;
const m = ing.amount_g / 100;
Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; });
});
return;
}
const food = allFoods.find(f => f.id === e.foodId);
if (!food) return;
const m = e.amount / 100;
Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; });
});
return t;
}, [dayLog, allFoods]);

const totals = dailyTotals();

const exerciseBurn = dayLog.filter(e => e.type === "exercise").reduce((s,e) => s + (e.calories_burned||0), 0);
const ratioSum = (exRatio.carb + exRatio.fat + exRatio.pro) || 100;
const effectiveGoals = exerciseBurn > 0 ? {
...goals,
cal:  goals.cal  + exerciseBurn,
carb: goals.carb + Math.round(exerciseBurn * (exRatio.carb / ratioSum) / 4),
fat:  goals.fat  + Math.round(exerciseBurn * (exRatio.fat  / ratioSum) / 9),
pro:  goals.pro  + Math.round(exerciseBurn * (exRatio.pro  / ratioSum) / 4),
} : goals;

const pct = k => Math.round((totals[k] / (effectiveGoals[k] || 1)) * 100);

const handleMacroTap = k => {
if (k==="cal") setView("calDetail");
if (k==="fib") setView("fibDetail");
if (k==="fat") setView("fatDetail");
if (k==="pro") setView("proDetail");
};

// food entry
const addEntry = () => {
if (!selectedFood || !amount) return;
if (editingEntryId) {
setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).map(e =>
e.id === editingEntryId ? { ...e, foodId:selectedFood.id, foodName:selectedFood.name, amount:parseFloat(amount), meal } : e
)}));
setEditingEntryId(null);
} else {
setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), {
id:Date.now().toString(), foodId:selectedFood.id, foodName:selectedFood.name,
amount:parseFloat(amount), meal, time:new Date().toISOString(),
}]}));
}
setSelectedFood(null); setAmount("100"); setSearchTerm(""); setView("log");
};

const removeEntry    = id => setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).filter(e => e.id !== id) }));
const startEditEntry = entry => {
const food = allFoods.find(f => f.id === entry.foodId);
if (!food) return;
setSelectedFood(food); setAmount(String(entry.amount)); setMeal(entry.meal); setEditingEntryId(entry.id); setView("add");
};

// exercise
const addExercise = burnOverride => {
const act = EXERCISE_ACTIVITIES.find(a => a.id === exActivity);
const wt  = parseFloat(profile.weightKg) || 70;
const dur = parseFloat(exDuration) || 0;
const auto = Math.round(act.met * wt * (dur / 60));
const burn = burnOverride !== undefined ? burnOverride : auto;
setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), {
id:Date.now().toString(), type:"exercise",
activity:act.label+" - "+act.intensity, duration_min:dur, calories_burned:burn, time:new Date().toISOString(),
}]}));
setExActivity(EXERCISE_ACTIVITIES[0].id); setExDuration("60"); setExBurnEdit(""); setView("log");
};

// recipe actions
const startNewRecipe  = () => { setRecipeInProgress({ name:"", source:"", servings:"4", ingredients:[] }); setEditingRecipeId(null); setView("recipeCreate"); };
const startEditRecipe = r   => { setRecipeInProgress({ name:r.name, source:r.source||"", servings:String(r.servings), ingredients:[...r.ingredients] }); setEditingRecipeId(r.id); setView("recipeCreate"); };

const saveRecipe = () => {
if (!recipeInProgress.name.trim() || recipeInProgress.ingredients.length === 0) return;
const s = parseFloat(recipeInProgress.servings) || 1;
const n = calcRecipeNutritionPerServing(recipeInProgress.ingredients, s, allFoods);
const rec = { name:recipeInProgress.name.trim(), source:recipeInProgress.source.trim(), servings:s, ingredients:recipeInProgress.ingredients, nutrition_per_serving:n };
if (editingRecipeId) {
setRecipes(prev => prev.map(r => r.id === editingRecipeId ? { ...r, ...rec } : r));
} else {
setRecipes(prev => [...prev, { id:`recipe_${Date.now()}`, ...rec }]);
}
setEditingRecipeId(null); setView("recipes");
};

const deleteRecipe = id => { setRecipes(prev => prev.filter(r => r.id !== id)); setView("recipes"); };

const addIngredientToRecipe = () => {
if (!recipeIngSelected || !recipeIngAmount) return;
setRecipeInProgress(prev => ({ ...prev, ingredients:[...prev.ingredients, {
foodId:recipeIngSelected.id, foodName:recipeIngSelected.name, amount_g:parseFloat(recipeIngAmount)||100,
}]}));
setRecipeIngSelected(null); setRecipeIngSearch(""); setRecipeIngAmount("100"); setView("recipeCreate");
};

const removeIngFromRecipe = idx => setRecipeInProgress(prev => ({ ...prev, ingredients:prev.ingredients.filter((_,i)=>i!==idx) }));

const logRecipe = () => {
if (!selectedRecipe) return;
const recipeServings = Math.max(Number(selectedRecipe.servings) || 1, 0.01);
const totalW = selectedRecipe.ingredients.reduce((s,i) => s+i.amount_g, 0);
let fraction, servingsLogged;
if (recipeLogMode === "servings") {
servingsLogged = parseFloat(recipeLogServings) || 1;
fraction = servingsLogged / recipeServings;
} else {
const g = parseFloat(recipeLogGrams) || 0;
fraction = totalW > 0 ? g / totalW : 0;
servingsLogged = Math.round(fraction * recipeServings * 10) / 10;
}
const derivedIngredients = selectedRecipe.ingredients.map(ing => ({
foodId:ing.foodId, foodName:ing.foodName, amount_g:Math.round(ing.amount_g * fraction * 10)/10,
}));
setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), {
id:Date.now().toString(), type:"recipe",
recipeId:selectedRecipe.id, recipeName:selectedRecipe.name,
servings:Math.round(servingsLogged*10)/10, meal:recipeLogMeal,
time:new Date().toISOString(), derivedIngredients,
}]}));
setView("log"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setSelectedRecipe(null); setRecipeLogReturn("recipeDetail");
};

const changeDate = delta => { const d = new Date(currentDate); d.setDate(d.getDate()+delta); setCurrentDate(dateKey(d)); };

const saveCustomFood = () => {
if (!cf.name.trim() || !cf.cal) return;
const newFood = { id:`custom_${Date.now()}`, name:cf.name.trim(), cat:cf.cat||"Other",
...Object.fromEntries(Object.keys(NUTRIENT_META).map(k => [k, parseFloat(cf[k])||0])) };
setCustomFoods(prev => [...prev, newFood]);
setCf({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });
setView("add");
};

// ── NOTION SYNC ───────────────────────────────────────────────────────────
const buildReviewData = (parsedRecipes) => {
  const review = parsedRecipes.map(r => {
    const existing = recipes.find(rec => rec.name.toLowerCase().trim() === (r.title||"").toLowerCase().trim());
    return {
      title:           r.title || "Untitled",
      servings:        r.servings || 4,
      source:          r.source || "",
      ingredients:     (r.ingredients || []).map(ing => {
        const match = fuzzyMatchFood(ing.name, allFoods);
        return {
          raw:      `${ing.amount} ${ing.unit} ${ing.name}`,
          name:     ing.name,
          amount:   ing.amount,
          unit:     ing.unit,
          amount_g: toGrams(ing.amount, ing.unit),
          match,
          skipped:  !match,  // auto-skip unmatched; user can pick manually
        };
      }),
      // null = duplicate needs decision; "import" = no duplicate
      duplicateAction: existing ? null : "import",
      existingId:      existing?.id || null,
      imported:        false,
    };
  });
  setSyncReviewData(review);
  setNotionSyncMsg(null);
  setSyncInProgress(false);
  setView("notionReview");
};

const handleTestConnection = async () => {
  setNotionSyncMsg({ type:"info", text:"Testing connection…" });
  // Diagnostic: capture exactly what fetch does, surface to the UI
  const diag = [];
  diag.push(`URL: ${WORKER_URL}/health`);
  diag.push(`Secret length: ${WORKER_AUTH_SECRET.length}`);
  diag.push(`Online: ${navigator.onLine}`);
  try {
    const t0 = Date.now();
    const res = await fetch(`${WORKER_URL}/health`, {
      method:  "GET",
      headers: { "X-NutriTrack-Auth": WORKER_AUTH_SECRET },
    });
    const dt = Date.now() - t0;
    diag.push(`Status: ${res.status}`);
    diag.push(`Time: ${dt}ms`);
    let body = "";
    try { body = await res.text(); } catch(e) { body = `[read err: ${e.message}]`; }
    diag.push(`Body: ${body.slice(0, 200)}`);
    setNotionSyncMsg({
      type: res.ok ? "info" : "error",
      text: diag.join(" | "),
    });
  } catch (err) {
    diag.push(`Threw: ${err.name || "Error"} - ${err.message || "no message"}`);
    diag.push(`Stack: ${(err.stack || "").split("\n")[0] || "n/a"}`);
    setNotionSyncMsg({ type:"error", text: diag.join(" | ") });
  }
  setTimeout(() => setNotionSyncMsg(null), 30000);
};

const handleResetSyncHistory = () => {
  setLastSyncedAt(null);
  saveData(STORAGE_KEYS.notionStatus, { lastSyncedAt:null });
  setNotionSyncMsg({ type:"info", text:"Sync history cleared. Next sync will fetch all recipes." });
  setTimeout(() => setNotionSyncMsg(null), 4000);
};

// Main worker-mediated sync handler. Flow:
//   1. List metadata for recipes edited since lastSyncedAt (or all if first time)
//   2. Fetch each recipe's ingredient lines via the Worker, with progress
//   3. Parse each recipe's ingredients via Claude API (still artifact-runtime)
//   4. Build review data and hand off to the existing review screen
// On successful import the user's lastSyncedAt is updated to fetched_at, so
// subsequent syncs only pull recipes edited after that point.
const handleWorkerSync = async () => {
  if (!navigator.onLine) {
    const entry = { id:Date.now().toString(), captured_time:new Date().toISOString(), status:"pending" };
    setSyncQueue(prev => [...prev, entry]);
    setNotionSyncMsg({ type:"info", text:"You're offline. Sync queued — will process when back online." });
    setTimeout(() => setNotionSyncMsg(null), 4000);
    return;
  }

  setSyncInProgress(true);
  setSyncProgress({ phase:"connecting", current:0, total:0 });
  setNotionSyncMsg(null);

  try {
    // Step 1 — list
    setSyncProgress({ phase:"listing", current:0, total:0 });
    const listResp = await fetchRecipesList(lastSyncedAt);
    const recipes  = listResp.recipes || [];
    const fetchedAt = listResp.fetched_at || new Date().toISOString();

    if (recipes.length === 0) {
      // Nothing changed since last sync — still update lastSyncedAt so the
      // window keeps moving forward
      setLastSyncedAt(fetchedAt);
      saveData(STORAGE_KEYS.notionStatus, { lastSyncedAt:fetchedAt });
      setSyncInProgress(false);
      setSyncProgress(null);
      setNotionSyncMsg({ type:"info", text: lastSyncedAt
        ? "No new or changed recipes since last sync."
        : "No recipes found in the Notion database." });
      setTimeout(() => setNotionSyncMsg(null), 5000);
      return;
    }

    // Step 2 — fetch ingredient lines per page, with concurrency + progress
    setSyncProgress({ phase:"fetching", current:0, total:recipes.length });
    const enriched = await fetchRecipePagesWithProgress(recipes, completed => {
      setSyncProgress({ phase:"fetching", current:completed, total:recipes.length });
    });

    // Filter out recipes with no ingredient lines (no table block, fetch
    // failure, or empty table). Keep them counted in the progress message
    // for transparency.
    const usable = enriched.filter(r => r.ingredientLines && r.ingredientLines.length > 0);
    const skipped = enriched.length - usable.length;

    if (usable.length === 0) {
      setSyncInProgress(false);
      setSyncProgress(null);
      setNotionSyncMsg({ type:"error", text:`Fetched ${recipes.length} recipe${recipes.length===1?"":"s"} but none had a parseable ingredient table.` });
      setTimeout(() => setNotionSyncMsg(null), 6000);
      return;
    }

    // Step 3 — parse ingredients via Claude (slow stage; many seconds per recipe)
    setSyncProgress({ phase:"parsing", current:0, total:usable.length });
    const parsed = [];
    for (let i = 0; i < usable.length; i++) {
      const r = usable[i];
      try {
        const ingredients = await parseIngredientsWithClaude(r.ingredientLines);
        parsed.push({ ...r, ingredients });
      } catch (e) {
        // Claude API failure for one recipe shouldn't kill the whole sync;
        // surface this recipe in review with no ingredients matched
        parsed.push({ ...r, ingredients: [] });
      }
      setSyncProgress({ phase:"parsing", current:i + 1, total:usable.length });
    }

    // Step 4 — build review data; the rest of the flow is identical to paste
    buildReviewData(parsed);

    // Persist the new high-water mark so next sync is incremental.
    // We do this on review entry rather than after import, on the principle
    // that the user has *seen* these recipes; if they skip them in review,
    // they won't be shown again unless edited in Notion.
    setLastSyncedAt(fetchedAt);
    saveData(STORAGE_KEYS.notionStatus, { lastSyncedAt:fetchedAt });

    if (skipped > 0) {
      setNotionSyncMsg({ type:"info", text:`Imported ${parsed.length} recipe${parsed.length===1?"":"s"} for review. ${skipped} skipped (no ingredient table).` });
      // Leave the message visible — review screen is showing now
    }
    setSyncProgress(null);
  } catch (err) {
    const msg = err.message || "unknown error";
    let friendly;
    if (msg.includes("worker_403"))           friendly = "Worker rejected the request. Check ALLOWED_ORIGINS on the Worker side.";
    else if (msg.includes("worker_502"))      friendly = "Worker reached, but Notion is unreachable. Check the Worker's NOTION_TOKEN.";
    else if (msg.startsWith("network:"))      friendly = "Lost connection to the Worker. Try again when online.";
    else                                       friendly = `Sync failed: ${msg}`;
    setNotionSyncMsg({ type:"error", text:friendly });
    setSyncInProgress(false);
    setSyncProgress(null);
    setTimeout(() => setNotionSyncMsg(null), 8000);
  }
};

const handlePasteSync = async () => {
  if (!pasteText.trim()) return;
  setSyncInProgress(true);
  setNotionSyncMsg({ type:"info", text:"Parsing pasted content…" });
  try {
    const rawRecipes = await parseRecipesFromPasteText(pasteText);
    if (rawRecipes.length === 0) {
      setNotionSyncMsg({ type:"error", text:"Could not find any recipes in the pasted text. Try copying more of the page." });
      setSyncInProgress(false);
      setTimeout(() => setNotionSyncMsg(null), 5000);
      return;
    }
    setNotionSyncMsg({ type:"info", text:`Found ${rawRecipes.length} recipe${rawRecipes.length===1?"":"s"}. Parsing ingredients…` });
    const parsed = await Promise.all(rawRecipes.map(async r => {
      const ingredients = await parseIngredientsWithClaude(r.ingredientLines);
      return { ...r, ingredients };
    }));
    buildReviewData(parsed);
  } catch (err) {
    setNotionSyncMsg({ type:"error", text:"Parsing failed. Please try again." });
    setSyncInProgress(false);
    setTimeout(() => setNotionSyncMsg(null), 4000);
  }
};

const importRecipe = (idx) => {
  const r = syncReviewData[idx];
  if (r.duplicateAction === "skip" || r.imported) return;
  const ingredients = r.ingredients
    .filter(ing => ing.match && !ing.skipped)
    .map(ing => ({ foodId:ing.match.id, foodName:ing.match.name, amount_g:ing.amount_g }));
  if (ingredients.length === 0) return;
  const s         = Math.max(r.servings || 1, 0.1);
  const nutrition = calcRecipeNutritionPerServing(ingredients, s, allFoods);
  const name      = r.duplicateAction === "copy" ? `${r.title} (imported)` : r.title;
  const newRecipe = {
    id: (r.duplicateAction === "overwrite" && r.existingId) ? r.existingId : `recipe_${Date.now()}_${idx}`,
    name, source:r.source, servings:s, ingredients, nutrition_per_serving:nutrition,
  };
  if (r.duplicateAction === "overwrite" && r.existingId) {
    setRecipes(prev => prev.map(rec => rec.id === r.existingId ? newRecipe : rec));
  } else {
    setRecipes(prev => [...prev, newRecipe]);
  }
  setSyncReviewData(prev => prev.map((item,i) => i===idx ? { ...item, imported:true } : item));
};

const importAllReady = () => {
  syncReviewData.forEach((_,idx) => {
    const r = syncReviewData[idx];
    if (!r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip") {
      importRecipe(idx);
    }
  });
  // NOTE: lastSyncedAt is owned by the worker sync flow (set to fetched_at
  // before review). We deliberately don't update it here, so that the
  // incremental-sync watermark reflects "what we asked Notion about" rather
  // than "when the user finished reviewing".
  setSyncQueue([]);
  setPasteText("");
  setView("settings");
  setNotionSyncMsg({ type:"info", text:"Import complete ✓" });
  setTimeout(() => setNotionSyncMsg(null), 3000);
};

const clearSyncQueue = () => {
  setSyncQueue([]);
  setNotionSyncMsg({ type:"info", text:"Queue cleared." });
  setTimeout(() => setNotionSyncMsg(null), 3000);
};

const filteredFoods = searchTerm.length > 0
? allFoods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())) : allFoods;
const groupedByCategory = filteredFoods.reduce((acc,f) => { if(!acc[f.cat])acc[f.cat]=[]; acc[f.cat].push(f); return acc; }, {});

const filteredIngFoods = recipeIngSearch.length > 0
? allFoods.filter(f => f.name.toLowerCase().includes(recipeIngSearch.toLowerCase())) : allFoods;
const groupedIngByCategory = filteredIngFoods.reduce((acc,f) => { if(!acc[f.cat])acc[f.cat]=[]; acc[f.cat].push(f); return acc; }, {});

const formatDate = ds => { const d=new Date(ds+"T12:00:00"); return d.toLocaleDateString("en-GB",{weekday:"short",month:"short",day:"numeric"}); };

if (!loaded) return (
<div style={{ background:"#0a0f1a", color:"#e2e8f0", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
<div style={{ textAlign:"center" }}>
<div style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.02em" }}>NutriTrack</div>
<div style={{ fontSize:13, color:"#64748b", marginTop:6 }}>Loading…</div>
</div>
</div>
);

const S = {
app:      { background:"#0a0f1a", color:"#e2e8f0", minHeight:"100vh", fontFamily:"'DM Sans', system-ui, sans-serif", paddingBottom:80 },
header:   { padding:"16px 20px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" },
section:  { padding:"0 20px" },
card:     { background:"#111827", borderRadius:14, padding:16, marginBottom:10, border:"1px solid #1e293b" },
macroGrid:{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:6, padding:"12px 20px" },
macroItem:{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" },
macroLabel:{ fontSize:10, color:"#94a3b8", fontWeight:500 },
macroVal: { fontSize:11, fontWeight:700, color:"#e2e8f0" },
mealHdr:  { fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" },
entry:    { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderBottom:"1px solid #1e293b" },
entryName:{ fontSize:14, fontWeight:500, color:"#e2e8f0" },
entryDet: { fontSize:12, color:"#64748b" },
entryCal: { fontSize:13, fontWeight:600, color:"#f59e0b" },
delBtn:   { background:"none", border:"none", color:"#ef4444", fontSize:16, cursor:"pointer", padding:"4px 8px" },
fab:      { position:"fixed", bottom:"calc(88px + env(safe-area-inset-bottom, 0px))", right:"calc(20px + env(safe-area-inset-right, 0px))",
width:52, height:52, borderRadius:16, background:"#3b82f6", border:"none", color:"#fff", fontSize:28, cursor:"pointer",
display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(59,130,246,0.4)" },
nav:      { position:"fixed", bottom:0, left:0, right:0, background:"#111827", borderTop:"1px solid #1e293b",
display:"flex", justifyContent:"space-around", padding:"8px 0", paddingBottom:"calc(8px + env(safe-area-inset-bottom, 0px))" },
navBtn: a => ({ background:"none", border:"none", color:a?"#3b82f6":"#64748b", fontSize:11, fontWeight:600, cursor:"pointer",
display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 10px" }),
input:    { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, padding:"12px 14px",
color:"#e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" },
srchItem: { padding:"12px 0", borderBottom:"1px solid #1e293b", cursor:"pointer" },
pill: a  => ({ padding:"6px 14px", borderRadius:20, border:a?"1px solid #3b82f6":"1px solid #334155",
background:a?"#1d4ed8":"transparent", color:a?"#fff":"#94a3b8", fontSize:13, cursor:"pointer" }),
microRow: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", cursor:"pointer" },
microBar: { height:4, borderRadius:2, background:"#1e293b", flex:1, margin:"0 8px", position:"relative", overflow:"hidden" },
label:    { fontSize:12, color:"#94a3b8", fontWeight:600, display:"block", marginBottom:6 },
cfRow:    { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1e293b" },
};

const RECIPE_VIEWS = ["recipes","recipeCreate","recipeIngAdd","recipeDetail","recipeLog"];

const BottomNav = () => (
<div style={S.nav}>
<button style={S.navBtn(view==="log")}                   onClick={() => setView("log")}>     <span style={{fontSize:18}}>📋</span>Log     </button>
<button style={S.navBtn(view==="goals")}                 onClick={() => setView("goals")}>   <span style={{fontSize:18}}>🎯</span>Goals   </button>
<button style={S.navBtn(RECIPE_VIEWS.includes(view))}    onClick={() => setView("recipes")}> <span style={{fontSize:18}}>📖</span>Recipes </button>
<button style={S.navBtn(view==="settings")}              onClick={() => setView("settings")}><span style={{fontSize:18}}>⚙️</span>Settings</button>
</div>
);

// ── LOG ───────────────────────────────────────────────────────────────────
if (view === "log") {
const grouped = {}; MEALS.forEach(m => grouped[m] = []);
dayLog.forEach(e => { if (e.type==="exercise") return; if (!grouped[e.meal]) grouped[e.meal]=[]; grouped[e.meal].push(e); });
return (
<div style={S.app}>
<div style={S.header}>
<div style={{ display:"flex", alignItems:"center", gap:12 }}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:20, padding:"4px 8px", cursor:"pointer" }} onClick={() => changeDate(-1)}>‹</button>
<span style={{ fontSize:15, fontWeight:600, color:"#e2e8f0", letterSpacing:"-0.01em" }}>
{formatDate(currentDate)}
{currentDate===today() && <span style={{ fontSize:10, color:"#3b82f6", fontWeight:600, marginLeft:6 }}>TODAY</span>}
</span>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:20, padding:"4px 8px", cursor:"pointer" }} onClick={() => changeDate(1)}>›</button>
</div>
</div>
<div style={S.macroGrid}>
{MACROS.map(k => (
<div key={k} style={S.macroItem} onClick={() => handleMacroTap(k)}>
<Ring value={totals[k]} max={effectiveGoals[k]} color={NUTRIENT_META[k].color} size={48} stroke={4}>
<text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill={NUTRIENT_META[k].color} fontSize={10} fontWeight={700}>{pct(k)}%</text>
</Ring>
<div style={S.macroLabel}>{NUTRIENT_META[k].label}</div>
<div style={S.macroVal}>{Math.round(totals[k])}<span style={{fontSize:9,color:"#64748b"}}>{NUTRIENT_META[k].unit}</span></div>
</div>
))}
</div>
{exerciseBurn > 0 && (
<div style={{ margin:"0 20px 8px", background:"#0f2d1a", border:"1px solid #16a34a", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
<span style={{ fontSize:13, color:"#4ade80" }}>🏃 {exerciseBurn} kcal burned today</span>
<span style={{ fontSize:11, color:"#166534" }}>goals adjusted</span>
</div>
)}
<div style={S.section}>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:8, letterSpacing:"0.05em", textTransform:"uppercase" }}>Micronutrients</div>
{MICROS.map(k => {
const p = pct(k); const meta = NUTRIENT_META[k];
return (
<div key={k} style={S.microRow} onClick={() => { setDetailNutrient(k); setView("detail"); }}>
<span style={{ fontSize:12, color:"#e2e8f0", width:80, fontWeight:500 }}>{meta.label}</span>
<div style={S.microBar}><div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${Math.min(p,100)}%`, background:meta.color, borderRadius:2, transition:"width 0.5s ease" }} /></div>
<span style={{ fontSize:11, color:p>=100?"#10b981":p>=60?"#f59e0b":"#ef4444", width:32, textAlign:"right" }}>{p}%</span>
</div>
);
})}
</div>
</div>
<div style={{ ...S.section, paddingBottom:180 }}>
{MEALS.map(m => {
const entries = grouped[m]; if (entries.length===0) return null;
const mealCals = entries.reduce((sum,e) => {
if (e.type==="recipe") return sum + computeEntryNutrition(e.derivedIngredients||[], allFoods).cal;
const f = allFoods.find(x=>x.id===e.foodId); return sum+(f?f.cal*e.amount/100:0);
}, 0);
return (
<div key={m}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"12px 0 4px" }}>
<div style={S.mealHdr}>{m}</div>
<span style={{ fontSize:12, color:"#f59e0b", fontWeight:600 }}>{Math.round(mealCals)} kcal</span>
</div>
{entries.map(e => {
if (e.type === "recipe") {
const nut = computeEntryNutrition(e.derivedIngredients||[], allFoods);
return (
<SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
<div style={S.entry}>
<div style={{ flex:1 }}>
<div style={{ ...S.entryName, color:"#a78bfa" }}>📖 {e.recipeName}</div>
<div style={S.entryDet}>{e.servings} {e.servings===1?"serving":"servings"}</div>
</div>
<div style={{ display:"flex", alignItems:"center" }}>
<span style={S.entryCal}>{Math.round(nut.cal)} kcal</span>
<button style={S.delBtn} onClick={() => removeEntry(e.id)}>×</button>
</div>
</div>
</SwipeableEntry>
);
}
const f = allFoods.find(x=>x.id===e.foodId);
return (
<SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
<div style={S.entry}>
<div style={{ flex:1, cursor:"pointer" }} onClick={() => startEditEntry(e)}>
<div style={S.entryName}>{e.foodName}</div>
<div style={S.entryDet}>{e.amount}g · tap to edit</div>
</div>
<div style={{ display:"flex", alignItems:"center" }}>
<span style={S.entryCal}>{f?Math.round(f.cal*e.amount/100):"-"} kcal</span>
<button style={S.delBtn} onClick={() => removeEntry(e.id)}>×</button>
</div>
</div>
</SwipeableEntry>
);
})}
</div>
);
})}
{dayLog.filter(e=>e.type!=="exercise").length===0 && (
<div style={{ textAlign:"center", padding:"40px 0", color:"#475569" }}>
<div style={{ fontSize:32, marginBottom:8 }}>🥗</div>
<div style={{ fontSize:14 }}>No food logged today</div>
<div style={{ fontSize:12, color:"#64748b" }}>Tap + to add your first meal</div>
</div>
)}
{dayLog.filter(e=>e.type==="exercise").length > 0 && (
<div>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"12px 0 4px" }}>
<div style={S.mealHdr}>Exercise</div>
<span style={{ fontSize:12, color:"#4ade80", fontWeight:600 }}>−{exerciseBurn} kcal</span>
</div>
{dayLog.filter(e=>e.type==="exercise").map(e => (
<SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
<div style={{ ...S.entry, background:"#0a0f1a" }}>
<div style={{ flex:1 }}>
<div style={{ fontSize:14, fontWeight:500, color:"#4ade80" }}>{e.activity}</div>
<div style={{ fontSize:12, color:"#64748b" }}>{e.duration_min} min</div>
</div>
<div style={{ display:"flex", alignItems:"center" }}>
<span style={{ fontSize:13, fontWeight:600, color:"#4ade80" }}>−{e.calories_burned} kcal</span>
<button style={S.delBtn} onClick={() => removeEntry(e.id)}>×</button>
</div>
</div>
</SwipeableEntry>
))}
</div>
)}
</div>
<button style={S.fab} onClick={() => { setEditingEntryId(null); setView("add"); setTimeout(()=>searchRef.current?.focus(),100); }}>+</button>
<button style={{ ...S.fab, right:"calc(84px + env(safe-area-inset-right, 0px))", background:"#16a34a", fontSize:22 }} onClick={() => setView("exercise")}>🏃</button>
<BottomNav />
</div>
);
}

// ── RECIPES LIBRARY ───────────────────────────────────────────────────────
if (view === "recipes") {
return (
<div style={S.app}>
<div style={S.header}>
<span style={{ fontSize:17, fontWeight:700 }}>Recipes</span>
<button style={{ background:"#3b82f6", border:"none", color:"#fff", borderRadius:10, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}
onClick={startNewRecipe}>+ New</button>
</div>
<div style={{ ...S.section, paddingBottom:20 }}>
{recipes.length === 0 ? (
<div style={{ textAlign:"center", padding:"60px 0", color:"#475569" }}>
<div style={{ fontSize:40, marginBottom:12 }}>📖</div>
<div style={{ fontSize:15, fontWeight:600, color:"#64748b", marginBottom:6 }}>No recipes yet</div>
<div style={{ fontSize:13 }}>Tap + New to create your first recipe</div>
</div>
) : (
<div style={{ marginTop:8 }}>
{recipes.map(r => {
const n = r.nutrition_per_serving || {};
return (
<div key={r.id} style={{ ...S.card, cursor:"pointer" }} onClick={() => { setSelectedRecipe(r); setView("recipeDetail"); }}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
<div style={{ flex:1 }}>
<div style={{ fontSize:15, fontWeight:700, color:"#e2e8f0", marginBottom:2 }}>{r.name}</div>
<div style={{ fontSize:12, color:"#475569", marginBottom:8 }}>
{r.servings} {r.servings===1?"serving":"servings"}{r.source?` · ${r.source}`:""} · {r.ingredients.length} ingredients
</div>
<div style={{ display:"flex", gap:12 }}>
{[{k:"cal",l:"kcal"},{k:"pro",l:"pro"},{k:"carb",l:"carb"},{k:"fat",l:"fat"}].map(({k,l}) => (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:13, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round((n[k]||0)*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{l}/srv</div>
</div>
))}
</div>
</div>
<div style={{ color:"#475569", fontSize:18, paddingLeft:8 }}>›</div>
</div>
</div>
);
})}
</div>
)}
</div>
<BottomNav />
</div>
);
}

// ── RECIPE DETAIL ─────────────────────────────────────────────────────────
if (view === "recipeDetail" && selectedRecipe) {
const r = selectedRecipe; const n = r.nutrition_per_serving || {};
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("recipes")}>← Back</button>
<span style={{ fontSize:15, fontWeight:700, flex:1, textAlign:"center", marginRight:48 }}>{r.name}</span>
<button style={{ background:"none", border:"none", color:"#3b82f6", fontSize:13, fontWeight:600, cursor:"pointer" }} onClick={() => startEditRecipe(r)}>Edit</button>
</div>
<div style={S.section}>
{r.source ? <div style={{ fontSize:12, color:"#475569", marginBottom:12, paddingTop:2 }}>Source: {r.source}</div> : null}
<div style={S.card}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>Per serving ({r.servings} total)</div>
<div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:12 }}>
{MACROS.map(k => (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:15, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round((n[k]||0)*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{NUTRIENT_META[k].label}</div>
</div>
))}
</div>
<div style={{ borderTop:"1px solid #1e293b", paddingTop:10 }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.04em" }}>Key micros / serving</div>
<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 16px" }}>
{["iron","calc","zinc","b12","omega3","fol"].map(k => (
<div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
<span style={{ color:"#94a3b8" }}>{NUTRIENT_META[k].label}</span>
<span style={{ color:NUTRIENT_META[k].color, fontWeight:600 }}>{Math.round((n[k]||0)*10)/10}{NUTRIENT_META[k].unit}</span>
</div>
))}
</div>
</div>
</div>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Ingredients ({r.ingredients.length})</div>
{r.ingredients.map((ing,i) => {
const food = allFoods.find(f=>f.id===ing.foodId);
const ingCal = food ? Math.round(food.cal*ing.amount_g/100) : 0;
return (
<div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<r.ingredients.length-1?"1px solid #1e293b":"none" }}>
<div><div style={{ fontSize:13, color:"#e2e8f0" }}>{ing.foodName}</div><div style={{ fontSize:11, color:"#64748b" }}>{ing.amount_g}g</div></div>
<span style={{ fontSize:12, color:"#f59e0b", fontWeight:600 }}>{ingCal} kcal</span>
</div>
);
})}
</div>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"#3b82f6", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:10 }}
onClick={() => { setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setRecipeLogMeal("Breakfast"); setView("recipeLog"); }}>
Log Recipe
</button>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"1px solid #ef4444", background:"transparent", color:"#ef4444", fontSize:14, fontWeight:600, cursor:"pointer", marginBottom:20 }}
onClick={() => deleteRecipe(r.id)}>Delete Recipe</button>
</div>
<BottomNav />
</div>
);
}

// ── RECIPE LOG ────────────────────────────────────────────────────────────
if (view === "recipeLog" && selectedRecipe) {
const r = selectedRecipe;
const recipeServings = Math.max(Number(r.servings) || 1, 0.01);
const totalW = r.ingredients.reduce((s,i) => s+i.amount_g, 0);

let frac = 0;
if (recipeLogMode === "servings") {
frac = (parseFloat(recipeLogServings) || 0) / recipeServings;
} else {
const g = parseFloat(recipeLogGrams) || 0;
frac = totalW > 0 ? g / totalW : 0;
}

const previewNut = {};
Object.keys(NUTRIENT_META).forEach(k => previewNut[k] = 0);
r.ingredients.forEach(ing => {
const food = allFoods.find(f => f.id === ing.foodId);
if (!food) return;
const m = (ing.amount_g * frac) / 100;
Object.keys(NUTRIENT_META).forEach(k => { previewNut[k] += (food[k] || 0) * m; });
});

const perServingNut = {};
Object.keys(NUTRIENT_META).forEach(k => perServingNut[k] = 0);
r.ingredients.forEach(ing => {
const food = allFoods.find(f => f.id === ing.foodId);
if (!food) return;
const m = (ing.amount_g / recipeServings) / 100;
Object.keys(NUTRIENT_META).forEach(k => { perServingNut[k] += (food[k] || 0) * m; });
});

const canLog = frac > 0;
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView(recipeLogReturn)}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Log Recipe</span>
<div style={{ width:48 }} />
</div>
<div style={S.section}>
<div style={{ fontSize:14, fontWeight:600, color:"#a78bfa", marginBottom:12 }}>📖 {r.name}</div>
<div style={S.card}>
<div style={{ display:"flex", background:"#0a0f1a", borderRadius:10, padding:4, marginBottom:16 }}>
{[["servings","By Servings"],["grams","By Weight"]].map(([mode,label]) => (
<button key={mode} style={{ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
background:recipeLogMode===mode?"#1d4ed8":"transparent", color:recipeLogMode===mode?"#fff":"#64748b" }}
onClick={() => setRecipeLogMode(mode)}>{label}</button>
))}
</div>
{recipeLogMode === "servings" ? (
<>
<label style={S.label}>
Servings to log — 1 serving = {Math.round(perServingNut.cal || 0)} kcal
</label>
<div style={{ fontSize:11, color:"#475569", marginBottom:8 }}>
Recipe has {r.servings} {r.servings===1?"serving":"servings"} total
</div>
<input style={S.input} type="number" inputMode="decimal" value={recipeLogServings} onChange={e => setRecipeLogServings(e.target.value)} />
<div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
{[...new Set([0.5, ...Array.from({length: r.servings}, (_,i) => i+1)])].map(q => (
<button key={q} style={S.pill(recipeLogServings===String(q))} onClick={() => setRecipeLogServings(String(q))}>
{q===0.5 ? "½" : q}
</button>
))}
</div>
</>
) : (
<>
<label style={S.label}>Weight (g) — recipe ingredients total {totalW}g</label>
<input style={S.input} type="number" inputMode="numeric" value={recipeLogGrams}
onChange={e => setRecipeLogGrams(e.target.value)} placeholder={`e.g. ${Math.round(totalW/r.servings)}`} />
<div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
{[0.5,1,1.5].map(mult => { const q=Math.round(totalW*mult/r.servings); return q>0 ? <button key={mult} style={S.pill(recipeLogGrams===String(q))} onClick={() => setRecipeLogGrams(String(q))}>{q}g</button> : null; })}
</div>
<div style={{ fontSize:11, color:"#475569", marginTop:8 }}>Based on raw ingredient weights</div>
</>
)}
<div style={{ background:"#0a0f1a", borderRadius:10, padding:12, margin:"16px 0" }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:8, textTransform:"uppercase" }}>Preview</div>
<div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
{MACROS.map(k => (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:14, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round((previewNut[k]||0)*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{NUTRIENT_META[k].label}</div>
</div>
))}
</div>
</div>
<label style={S.label}>Meal</label>
<div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
{MEALS.map(m => <button key={m} style={S.pill(recipeLogMeal===m)} onClick={() => setRecipeLogMeal(m)}>{m}</button>)}
</div>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none",
background:canLog?"#3b82f6":"#1e293b", color:canLog?"#fff":"#64748b", fontSize:15, fontWeight:700, cursor:"pointer" }}
disabled={!canLog} onClick={logRecipe}>Add to {recipeLogMeal}</button>
</div>
</div>
<BottomNav />
</div>
);
}

// ── RECIPE CREATE / EDIT ──────────────────────────────────────────────────
if (view === "recipeCreate") {
const curServings  = parseFloat(recipeInProgress.servings) || 1;
const previewNut   = recipeInProgress.ingredients.length > 0
? calcRecipeNutritionPerServing(recipeInProgress.ingredients, curServings, allFoods) : null;
const canSave = recipeInProgress.name.trim().length > 0 && recipeInProgress.ingredients.length > 0;
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }}
onClick={() => { setEditingRecipeId(null); setView("recipes"); }}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>{editingRecipeId ? "Edit Recipe" : "New Recipe"}</span>
<button style={{ background:"none", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", color:canSave?"#3b82f6":"#334155" }}
onClick={saveRecipe} disabled={!canSave}>Save</button>
</div>
<div style={S.section}>
<div style={S.card}>
<label style={S.label}>Recipe name *</label>
<input style={{ ...S.input, marginBottom:12 }} placeholder="e.g. Red Lentil Dal"
value={recipeInProgress.name} onChange={e => setRecipeInProgress(p => ({ ...p, name:e.target.value }))} />
<label style={S.label}>Source (optional)</label>
<input style={{ ...S.input, marginBottom:12 }} placeholder="e.g. Mum's recipe"
value={recipeInProgress.source} onChange={e => setRecipeInProgress(p => ({ ...p, source:e.target.value }))} />
<label style={S.label}>Number of servings</label>
<input style={{ ...S.input, marginBottom:6 }} type="number" inputMode="decimal"
value={recipeInProgress.servings} onChange={e => setRecipeInProgress(p => ({ ...p, servings:e.target.value }))} />
<div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
{[1,2,3,4,6,8].map(n => <button key={n} style={S.pill(recipeInProgress.servings===String(n))} onClick={() => setRecipeInProgress(p=>({...p,servings:String(n)}))}>{n}</button>)}
</div>
</div>
{previewNut && (
<div style={{ ...S.card, background:"#0a0f1a" }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Per serving preview</div>
<div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
{MACROS.map(k => (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:14, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round((previewNut[k]||0)*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{NUTRIENT_META[k].label}</div>
</div>
))}
</div>
</div>
)}
<div style={S.card}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" }}>
Ingredients {recipeInProgress.ingredients.length>0?`(${recipeInProgress.ingredients.length})`:""}
</div>
<button style={{ background:"#1d4ed8", border:"none", color:"#fff", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}
onClick={() => { setRecipeIngSearch(""); setRecipeIngSelected(null); setRecipeIngAmount("100"); setView("recipeIngAdd"); setTimeout(()=>recipeIngRef.current?.focus(),100); }}>+ Add</button>
</div>
{recipeInProgress.ingredients.length === 0 ? (
<div style={{ textAlign:"center", padding:"20px 0", color:"#475569", fontSize:13 }}>No ingredients yet — tap + Add</div>
) : recipeInProgress.ingredients.map((ing,i) => {
const food = allFoods.find(f=>f.id===ing.foodId);
const ingCal = food ? Math.round(food.cal*ing.amount_g/100) : 0;
return (
<div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<recipeInProgress.ingredients.length-1?"1px solid #1e293b":"none" }}>
<div style={{ flex:1 }}>
<div style={{ fontSize:13, color:"#e2e8f0" }}>{ing.foodName}</div>
<div style={{ fontSize:11, color:"#64748b" }}>{ing.amount_g}g · {ingCal} kcal</div>
</div>
<button style={{ background:"none", border:"none", color:"#ef4444", fontSize:18, cursor:"pointer", padding:"4px 8px" }}
onClick={() => removeIngFromRecipe(i)}>×</button>
</div>
);
})}
</div>
{!canSave && (
<div style={{ fontSize:12, color:"#475569", textAlign:"center", paddingBottom:20 }}>
{recipeInProgress.name.trim()==="" ? "Add a recipe name to save" : "Add at least one ingredient to save"}
</div>
)}
</div>
<BottomNav />
</div>
);
}

// ── RECIPE INGREDIENT ADD ─────────────────────────────────────────────────
if (view === "recipeIngAdd") {
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }}
onClick={() => { setRecipeIngSelected(null); setRecipeIngSearch(""); setView("recipeCreate"); }}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>{recipeIngSelected ? "Set Amount" : "Add Ingredient"}</span>
{!recipeIngSelected
? <button style={{ background:"none", border:"none", color:"#3b82f6", fontSize:13, cursor:"pointer", fontWeight:600 }} onClick={() => setView("customAdd")}>+ Custom</button>
: <div style={{ width:64 }} />}
</div>
{!recipeIngSelected ? (
<div style={S.section}>
<input ref={recipeIngRef} style={S.input} placeholder="Search foods…" value={recipeIngSearch}
onChange={e => setRecipeIngSearch(e.target.value)} autoFocus />
<div style={{ marginTop:12, maxHeight:"calc(100vh - 160px)", overflowY:"auto" }}>
{Object.entries(groupedIngByCategory).map(([cat,foods]) => (
<div key={cat}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", padding:"10px 0 4px", letterSpacing:"0.05em", textTransform:"uppercase" }}>{cat}</div>
{foods.map(f => (
<div key={f.id} style={S.srchItem} onClick={() => setRecipeIngSelected(f)}>
<span style={{ fontSize:12, color:"#f59e0b", float:"right" }}>{f.cal} kcal/100g</span>
<div style={{ fontSize:14, fontWeight:500, color:"#e2e8f0" }}>{f.name}</div>
</div>
))}
</div>
))}
{filteredIngFoods.length===0 && <div style={{ padding:20, textAlign:"center", color:"#475569", fontSize:14 }}>No foods found for "{recipeIngSearch}"</div>}
</div>
</div>
) : (
<div style={S.section}>
<div style={S.card}>
<div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{recipeIngSelected.name}</div>
<div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>{recipeIngSelected.cat}</div>
<label style={S.label}>Amount (g)</label>
<input style={S.input} type="number" inputMode="numeric" value={recipeIngAmount} onChange={e => setRecipeIngAmount(e.target.value)} />
<div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap", marginBottom:16 }}>
{[25,50,100,150,200,250,300,400,500].map(q => <button key={q} style={S.pill(recipeIngAmount===String(q))} onClick={() => setRecipeIngAmount(String(q))}>{q}</button>)}
</div>
<div style={{ background:"#0a0f1a", borderRadius:10, padding:12, marginBottom:16 }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:8, textTransform:"uppercase" }}>Preview</div>
<div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
{MACROS.map(k => { const val=(recipeIngSelected[k]||0)*(parseFloat(recipeIngAmount)||0)/100; return (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:14, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round(val*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{NUTRIENT_META[k].label}</div>
</div>
); })}
</div>
</div>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none",
background:(parseFloat(recipeIngAmount)||0)>0?"#3b82f6":"#1e293b",
color:(parseFloat(recipeIngAmount)||0)>0?"#fff":"#64748b", fontSize:15, fontWeight:700, cursor:"pointer" }}
disabled={(parseFloat(recipeIngAmount)||0)<=0} onClick={addIngredientToRecipe}>Add to Recipe</button>
</div>
</div>
)}
<BottomNav />
</div>
);
}

// ── ADD FOOD ──────────────────────────────────────────────────────────────
if (view === "add") {
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }}
onClick={() => { setView("log"); setSelectedFood(null); setSearchTerm(""); setEditingEntryId(null); }}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>{selectedFood?(editingEntryId?"Edit Entry":"Log Amount"):"Add Food"}</span>
{!selectedFood
? <button style={{ background:"none", border:"none", color:"#3b82f6", fontSize:13, cursor:"pointer", fontWeight:600 }} onClick={() => setView("customAdd")}>+ Custom</button>
: <div style={{ width:64 }} />}
</div>
{!selectedFood ? (
<div style={S.section}>
<input ref={searchRef} style={S.input} placeholder="Search foods or recipes…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} autoFocus />
<div style={{ marginTop:12, maxHeight:"calc(100vh - 160px)", overflowY:"auto" }}>
{(() => {
const matchedRecipes = searchTerm.length > 0
? recipes.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
: recipes;
if (matchedRecipes.length === 0) return null;
return (
<div>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", padding:"10px 0 4px", letterSpacing:"0.05em", textTransform:"uppercase" }}>Recipes</div>
{matchedRecipes.map(r => {
const n = r.nutrition_per_serving || {};
return (
<div key={r.id} style={{ ...S.srchItem, paddingBottom:10 }} onClick={() => {
setSelectedRecipe(r);
setRecipeLogReturn("add");
setRecipeLogServings("1");
setRecipeLogGrams("");
setRecipeLogMode("servings");
setRecipeLogMeal(meal);
setView("recipeLog");
}}>
<span style={{ fontSize:12, color:"#a78bfa", float:"right" }}>{Math.round(n.cal||0)} kcal/srv</span>
<div style={{ fontSize:14, fontWeight:500, color:"#a78bfa" }}>📖 {r.name}</div>
<div style={{ fontSize:11, color:"#475569" }}>{r.servings} {r.servings===1?"serving":"servings"} · {r.ingredients.length} ingredients</div>
</div>
);
})}
</div>
);
})()}
{Object.entries(groupedByCategory).map(([cat,foods]) => (
<div key={cat}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", padding:"10px 0 4px", letterSpacing:"0.05em", textTransform:"uppercase" }}>{cat}</div>
{foods.map(f => (
<div key={f.id} style={S.srchItem} onClick={() => setSelectedFood(f)}>
<span style={{ fontSize:12, color:"#f59e0b", float:"right" }}>{f.cal} kcal/100g</span>
<div style={{ fontSize:14, fontWeight:500, color:"#e2e8f0" }}>{f.name}</div>
</div>
))}
</div>
))}
{filteredFoods.length===0 && recipes.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).length===0 && searchTerm.length>0 && <div style={{ padding:20, textAlign:"center", color:"#475569", fontSize:14 }}>No results for "{searchTerm}"</div>}
</div>
</div>
) : (
<div style={S.section}>
<div style={S.card}>
<div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{selectedFood.name}</div>
<div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>{selectedFood.cat}</div>
<label style={S.label}>Amount (g / ml)</label>
<input style={S.input} type="number" value={amount} onChange={e => setAmount(e.target.value)} inputMode="numeric" />
<div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap", marginBottom:16 }}>
{[25,50,100,150,200,250].map(q => <button key={q} style={S.pill(amount===String(q))} onClick={() => setAmount(String(q))}>{q}</button>)}
</div>
<label style={S.label}>Meal</label>
<div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
{MEALS.map(m => <button key={m} style={S.pill(meal===m)} onClick={() => setMeal(m)}>{m}</button>)}
</div>
<div style={{ background:"#0a0f1a", borderRadius:10, padding:12, marginBottom:16 }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:8, textTransform:"uppercase" }}>Preview</div>
<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
{MACROS.map(k => { const val=(selectedFood[k]||0)*(parseFloat(amount)||0)/100; return (
<div key={k} style={{ textAlign:"center" }}>
<div style={{ fontSize:16, fontWeight:700, color:NUTRIENT_META[k].color }}>{Math.round(val*10)/10}</div>
<div style={{ fontSize:10, color:"#64748b" }}>{NUTRIENT_META[k].label}</div>
</div>
); })}
</div>
</div>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"#3b82f6", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}
onClick={addEntry}>{editingEntryId?"Save Changes":"Add to "+meal}</button>
</div>
</div>
)}
</div>
);
}

// ── EXERCISE ──────────────────────────────────────────────────────────────
if (view === "exercise") {
const wt = parseFloat(profile.weightKg)||70;
const act = EXERCISE_ACTIVITIES.find(a=>a.id===exActivity);
const dur = parseFloat(exDuration)||0;
const autoBurn = Math.round(act.met*wt*(dur/60));
const burn = exBurnEdit!==""?parseInt(exBurnEdit)||0:autoBurn;
const actGroups = EXERCISE_ACTIVITIES.reduce((acc,a) => { if(!acc[a.label])acc[a.label]=[]; acc[a.label].push(a); return acc; }, {});
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Log Exercise</span>
<div style={{ width:48 }} />
</div>
<div style={S.section}>
{!profile.weightKg && <div style={{ background:"#2d1f00", border:"1px solid #f59e0b", borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:12, color:"#f59e0b" }}>No weight set in Settings — using 70kg default</div>}
<div style={S.card}>
<label style={S.label}>Activity</label>
{Object.entries(actGroups).map(([grp,acts]) => (
<div key={grp} style={{ marginBottom:10 }}>
<div style={{ fontSize:11, color:"#475569", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>{grp}</div>
<div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
{acts.map(a => <button key={a.id} style={S.pill(exActivity===a.id)} onClick={() => { setExActivity(a.id); setExBurnEdit(""); }}>{a.intensity}</button>)}
</div>
</div>
))}
<label style={{ ...S.label, marginTop:8 }}>Duration (minutes)</label>
<input style={S.input} type="number" inputMode="numeric" value={exDuration} onChange={e => { setExDuration(e.target.value); setExBurnEdit(""); }} />
<div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap", marginBottom:16 }}>
{[30,45,60,90,120,180].map(d => <button key={d} style={S.pill(exDuration===String(d)&&exBurnEdit==="")} onClick={() => { setExDuration(String(d)); setExBurnEdit(""); }}>{d}</button>)}
</div>
<div style={{ background:"#0a0f1a", borderRadius:10, padding:14, marginBottom:16 }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:10, textTransform:"uppercase" }}>Estimated Burn</div>
<div style={{ display:"flex", alignItems:"center", gap:12 }}>
<div style={{ fontSize:32, fontWeight:700, color:"#4ade80" }}>{burn}</div>
<div style={{ fontSize:12, color:"#64748b" }}>kcal<br/>{act.label} · {act.intensity}<br/>{dur} min @ MET {act.met}</div>
</div>
<div style={{ marginTop:12 }}>
<label style={S.label}>Override (optional)</label>
<input style={S.input} type="number" inputMode="numeric" placeholder={"Auto: "+autoBurn+" kcal"} value={exBurnEdit} onChange={e => setExBurnEdit(e.target.value)} />
</div>
</div>
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:dur>0?"#16a34a":"#1e293b", color:dur>0?"#fff":"#64748b", fontSize:15, fontWeight:700, cursor:"pointer" }}
disabled={dur<=0} onClick={() => addExercise(exBurnEdit!==""?parseInt(exBurnEdit)||autoBurn:undefined)}>Log Exercise</button>
</div>
</div>
</div>
);
}

// ── CUSTOM FOOD ───────────────────────────────────────────────────────────
if (view === "customAdd") {
const fields = [{k:"cal",l:"Calories (kcal)"},{k:"pro",l:"Protein (g)"},{k:"carb",l:"Carbs (g)"},{k:"fat",l:"Fat (g)"},{k:"fib",l:"Fibre (g)"},
{k:"iron",l:"Iron (mg)"},{k:"calc",l:"Calcium (mg)"},{k:"zinc",l:"Zinc (mg)"},{k:"b12",l:"B12 (mcg)"},{k:"vitD",l:"Vitamin D (mcg)"},
{k:"omega3",l:"Omega-3 (g)"},{k:"iod",l:"Iodine (mcg)"},{k:"sel",l:"Selenium (mcg)"},{k:"mag",l:"Magnesium (mg)"},{k:"pot",l:"Potassium (mg)"},{k:"fol",l:"Folate (mcg)"}];
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("add")}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Add Custom Food</span>
<div style={{ width:48 }} />
</div>
<div style={S.section}>
<div style={S.card}>
<div style={{ fontSize:12, color:"#64748b", marginBottom:12 }}>All values per 100g or 100ml.</div>
<label style={S.label}>Food name *</label>
<input style={{ ...S.input, marginBottom:12 }} placeholder="e.g. Alpro Oat Yogurt" value={cf.name} onChange={e => setCf(p=>({...p,name:e.target.value}))} />
{fields.map(({k,l}) => (
<div key={k} style={S.cfRow}>
<span style={{ fontSize:13, color:"#e2e8f0", width:160 }}>{l}</span>
<input style={{ ...S.input, width:90, textAlign:"right", padding:"8px 12px" }} type="number" inputMode="decimal" placeholder="0"
value={cf[k]} onChange={e => setCf(p=>({...p,[k]:e.target.value}))} />
</div>
))}
<button style={{ width:"100%", marginTop:16, padding:14, borderRadius:12, border:"none",
background:cf.name.trim()&&cf.cal?"#3b82f6":"#1e293b", color:cf.name.trim()&&cf.cal?"#fff":"#64748b", fontSize:15, fontWeight:700, cursor:"pointer" }}
onClick={saveCustomFood} disabled={!cf.name.trim()||!cf.cal}>Save Food</button>
</div>
</div>
</div>
);
}

// ── GOALS ─────────────────────────────────────────────────────────────────
if (view === "goals") {
return (
<div style={S.app}>
<div style={S.header}><span style={{ fontSize:17, fontWeight:700 }}>Daily Goals</span></div>
<div style={S.section}>
<div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>Set your daily nutritional targets.</div>
{[...MACROS,...MICROS].map(k => {
const meta = NUTRIENT_META[k];
return (
<div key={k} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #1e293b" }}>
<div><div style={{ fontSize:14, fontWeight:500, color:"#e2e8f0" }}>{meta.label}</div><div style={{ fontSize:11, color:"#64748b" }}>{meta.unit}</div></div>
<input style={{ ...S.input, width:90, textAlign:"right", padding:"8px 12px" }} type="number" inputMode="decimal" value={goals[k]}
onChange={e => setGoals(prev=>({...prev,[k]:parseFloat(e.target.value)||0}))} />
</div>
);
})}
<div style={{ marginTop:20, marginBottom:6 }}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" }}>Exercise Refuel Ratio</div>
<div style={{ fontSize:11, color:"#475569", marginTop:4, marginBottom:12 }}>How exercise calories are distributed across macros. Must sum to 100.</div>
{[{key:"carb",label:"Carbs (%)",color:NUTRIENT_META.carb.color},{key:"fat",label:"Fat (%)",color:NUTRIENT_META.fat.color},{key:"pro",label:"Protein (%)",color:NUTRIENT_META.pro.color}].map(({key,label,color}) => (
<div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1e293b" }}>
<div style={{ display:"flex", alignItems:"center", gap:8 }}>
<div style={{ width:10, height:10, borderRadius:2, background:color, flexShrink:0 }} />
<div style={{ fontSize:14, fontWeight:500, color:"#e2e8f0" }}>{label}</div>
</div>
<input style={{ ...S.input, width:70, textAlign:"right", padding:"8px 12px" }} type="number" inputMode="numeric" value={exRatio[key]}
onChange={e => setExRatio(prev=>({...prev,[key]:parseInt(e.target.value)||0}))} />
</div>
))}
{(() => { const s=exRatio.carb+exRatio.fat+exRatio.pro; const ok=s===100; return (
<div style={{ padding:"8px 0", fontSize:13, fontWeight:600, color:ok?"#10b981":"#ef4444", textAlign:"right" }}>Sum: {s} {ok?"✓":"needs to equal 100"}</div>
); })()}
</div>
</div>
<BottomNav />
</div>
);
}

// ── SETTINGS (replaces Profile) ───────────────────────────────────────────
if (view === "settings") {
const formatSyncTime = iso => {
if (!iso) return "Never";
const d = new Date(iso);
return d.toLocaleDateString("en-GB", { day:"numeric", month:"short" }) + " at " + d.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" });
};
return (
<div style={S.app}>
<div style={S.header}><span style={{ fontSize:17, fontWeight:700 }}>Settings</span></div>
<div style={S.section}>

{/* ── Profile section ── */}
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10, marginTop:4 }}>Profile</div>
<div style={S.card}>
<div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>Used to personalise exercise calorie burn estimates.</div>
<label style={S.label}>Name</label>
<input style={{ ...S.input, marginBottom:16 }} placeholder="e.g. Nick" value={profile.name} onChange={e => setProfile(p=>({...p,name:e.target.value}))} />
<label style={S.label}>Weight (kg)</label>
<input style={{ ...S.input, marginBottom:16 }} type="number" inputMode="decimal" placeholder="e.g. 75" value={profile.weightKg} onChange={e => setProfile(p=>({...p,weightKg:e.target.value}))} />
<label style={S.label}>Age</label>
<input style={{ ...S.input, marginBottom:16 }} type="number" inputMode="numeric" placeholder="e.g. 30" value={profile.age} onChange={e => setProfile(p=>({...p,age:e.target.value}))} />
<label style={S.label}>Sex</label>
<div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
{["Male","Female","Other","Prefer not to say"].map(opt => (
<button key={opt} style={S.pill(profile.sex===opt)} onClick={() => setProfile(p=>({...p,sex:opt}))}>{opt}</button>
))}
</div>
</div>

{(profile.name||profile.weightKg) && (
<div style={{ ...S.card, background:"#0f172a" }}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Summary</div>
{profile.name     && <div style={{ fontSize:14, color:"#e2e8f0", marginBottom:4 }}>👤 {profile.name}</div>}
{profile.weightKg && <div style={{ fontSize:14, color:"#e2e8f0", marginBottom:4 }}>⚖️ {profile.weightKg} kg</div>}
{profile.age      && <div style={{ fontSize:14, color:"#e2e8f0", marginBottom:4 }}>🎂 {profile.age} years old</div>}
{profile.sex      && <div style={{ fontSize:14, color:"#e2e8f0", marginBottom:4 }}>⚧ {profile.sex}</div>}
{!profile.weightKg && <div style={{ fontSize:12, color:"#f59e0b", marginTop:6 }}>⚠️ Add your weight to enable accurate exercise calorie estimates</div>}
</div>
)}

{/* ── Notion Sync section ── */}
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10, marginTop:16 }}>Notion Recipe Import</div>
<div style={S.card}>

{/* Status row */}
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:12, marginBottom:12, borderBottom:"1px solid #1e293b" }}>
<span style={{ fontSize:13, color:"#94a3b8" }}>Last synced</span>
<span style={{ fontSize:13, color: lastSyncedAt ? "#10b981" : "#475569", fontWeight:600 }}>
{formatSyncTime(lastSyncedAt)}
</span>
</div>

{/* Offline queue indicator */}
{syncQueue.length > 0 && (
<div style={{ background:"#1c1a00", border:"1px solid #854d0e", borderRadius:10, padding:"10px 14px", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
<div>
<div style={{ fontSize:13, color:"#fbbf24", fontWeight:600 }}>⏳ {syncQueue.length} {syncQueue.length===1?"request":"requests"} queued</div>
<div style={{ fontSize:11, color:"#78716c", marginTop:2 }}>Will process when back online</div>
</div>
<button style={{ background:"none", border:"1px solid #854d0e", borderRadius:8, color:"#f59e0b", fontSize:11, fontWeight:600, padding:"4px 10px", cursor:"pointer" }}
onClick={clearSyncQueue}>Clear</button>
</div>
)}

{/* Feedback message */}
{notionSyncMsg && (
<div style={{ background: notionSyncMsg.type==="error" ? "#2d0f0f" : "#0f1f2d",
border: `1px solid ${notionSyncMsg.type==="error" ? "#7f1d1d" : "#1d4ed8"}`,
borderRadius:10, padding:"10px 14px", marginBottom:12,
fontSize:11, color: notionSyncMsg.type==="error" ? "#fca5a5" : "#93c5fd",
wordBreak:"break-word", whiteSpace:"pre-wrap", fontFamily:"ui-monospace, monospace", lineHeight:1.5 }}>
{notionSyncMsg.text}
</div>
)}

{/* Progress display during sync */}
{syncProgress && (
<div style={{ background:"#0f1f2d", border:"1px solid #1d4ed8", borderRadius:10, padding:"12px 14px", marginBottom:12 }}>
<div style={{ fontSize:13, color:"#93c5fd", fontWeight:600, marginBottom:6 }}>
{syncProgress.phase === "connecting" && "Connecting to Notion…"}
{syncProgress.phase === "listing"    && "Looking for new and changed recipes…"}
{syncProgress.phase === "fetching"   && `Fetching ${syncProgress.current} of ${syncProgress.total} recipes…`}
{syncProgress.phase === "parsing"    && `Parsing ingredients (${syncProgress.current} of ${syncProgress.total})…`}
</div>
{syncProgress.total > 0 && (
<div style={{ height:6, borderRadius:3, background:"#1e293b", overflow:"hidden" }}>
<div style={{ height:"100%", background:"#3b82f6", borderRadius:3,
width:`${Math.round((syncProgress.current / Math.max(syncProgress.total, 1)) * 100)}%`,
transition:"width 0.3s ease" }} />
</div>
)}
<div style={{ fontSize:11, color:"#475569", marginTop:6 }}>
{syncProgress.phase === "fetching" && "Don't close the app. This can take several minutes for a first sync."}
{syncProgress.phase === "parsing"  && "Parsing each recipe's ingredients via Claude API."}
</div>
</div>
)}

{/* Primary sync button */}
<button
style={{ width:"100%", padding:14, borderRadius:12, border:"none",
background: syncInProgress ? "#1e293b" : "#7c3aed",
color: syncInProgress ? "#64748b" : "#fff",
fontSize:15, fontWeight:700, cursor: syncInProgress ? "default" : "pointer",
marginBottom:8 }}
disabled={syncInProgress}
onClick={handleWorkerSync}>
{syncInProgress ? "Syncing…" : (lastSyncedAt ? "Sync new and changed recipes" : "Sync all recipes from Notion")}
</button>

{/* Secondary actions */}
<div style={{ display:"flex", gap:8, marginBottom:14 }}>
<button
style={{ flex:1, padding:"10px 12px", borderRadius:10, border:"1px solid #334155",
background:"transparent", color: syncInProgress ? "#475569" : "#94a3b8",
fontSize:12, fontWeight:600, cursor: syncInProgress ? "default" : "pointer" }}
disabled={syncInProgress}
onClick={handleTestConnection}>
Test connection
</button>
{lastSyncedAt && (
<button
style={{ flex:1, padding:"10px 12px", borderRadius:10, border:"1px solid #334155",
background:"transparent", color: syncInProgress ? "#475569" : "#94a3b8",
fontSize:12, fontWeight:600, cursor: syncInProgress ? "default" : "pointer" }}
disabled={syncInProgress}
onClick={handleResetSyncHistory}>
Reset sync history
</button>
)}
</div>

{/* Manual paste fallback */}
<details style={{ marginTop:6 }}>
<summary style={{ fontSize:12, color:"#64748b", cursor:"pointer", padding:"8px 0", listStyle:"none", outline:"none", userSelect:"none" }}>
▸ Manual import (fallback)
</summary>
<div style={{ marginTop:8 }}>
<div style={{ fontSize:11, color:"#64748b", marginBottom:8, lineHeight:1.5 }}>
Paste ingredient text from any source. Use this if the main sync isn't working or for ad-hoc one-off recipes.
</div>
<textarea
style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10,
padding:"12px 14px", color:"#e2e8f0", fontSize:13, outline:"none",
boxSizing:"border-box", minHeight:100, resize:"vertical", fontFamily:"inherit" }}
placeholder={"e.g.\n50 g of flour\n1 tsp cornstarch\n90 g brown sugar"}
value={pasteText}
onChange={e => setPasteText(e.target.value)}
/>
<button
style={{ width:"100%", marginTop:8, padding:12, borderRadius:10, border:"1px solid #334155",
background: pasteText.trim()&&!syncInProgress ? "transparent" : "#0f1729",
color: pasteText.trim()&&!syncInProgress ? "#94a3b8" : "#475569",
fontSize:13, fontWeight:600, cursor: pasteText.trim()&&!syncInProgress ? "pointer" : "default" }}
disabled={!pasteText.trim()||syncInProgress}
onClick={handlePasteSync}>
{syncInProgress ? "Working…" : "Parse pasted text"}
</button>
</div>
</details>

<div style={{ fontSize:11, color:"#334155", textAlign:"center", marginTop:14 }}>
{recipes.length} {recipes.length===1?"recipe":"recipes"} stored locally
</div>
</div>

</div>
<BottomNav />
</div>
);
}

// ── NOTION REVIEW ─────────────────────────────────────────────────────────
if (view === "notionReview") {
const allResolved = syncReviewData.every(r =>
  r.duplicateAction !== null
);
const readyCount = syncReviewData.filter(r =>
  !r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip"
).length;

return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }}
onClick={() => { setView("settings"); setSyncReviewData([]); }}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Review Import</span>
<button
style={{ background:"none", border:"none", fontSize:13, fontWeight:700, cursor:allResolved&&readyCount>0?"pointer":"default",
color:allResolved&&readyCount>0?"#7c3aed":"#334155" }}
disabled={!allResolved||readyCount===0}
onClick={importAllReady}>
Import All ({readyCount})
</button>
</div>
<div style={{ ...S.section, paddingBottom:40 }}>
{syncReviewData.length === 0 && (
<div style={{ textAlign:"center", padding:"40px 0", color:"#475569" }}>No recipes to review.</div>
)}
{syncReviewData.map((r, rIdx) => {
const unmatchedCount = r.ingredients.filter(ing => !ing.match && !ing.skipped).length;
const skippedCount   = r.ingredients.filter(ing => ing.skipped).length;
const matchedCount   = r.ingredients.filter(ing => ing.match && !ing.skipped).length;
return (
<div key={rIdx} style={{ ...S.card, marginBottom:12, opacity: r.imported ? 0.5 : 1 }}>
{/* Recipe header */}
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
<div style={{ flex:1 }}>
<div style={{ fontSize:15, fontWeight:700, color: r.imported?"#10b981":"#e2e8f0" }}>
{r.imported && "✓ "}{r.title}
</div>
<div style={{ fontSize:12, color:"#475569", marginTop:2 }}>
{r.servings} serving{r.servings===1?"":"s"}{r.source?` · ${r.source}`:""}
</div>
</div>
</div>

{/* Duplicate handling */}
{r.existingId && !r.imported && (
<div style={{ background:"#1c1200", border:"1px solid #92400e", borderRadius:10, padding:"10px 12px", marginBottom:10 }}>
<div style={{ fontSize:12, color:"#fbbf24", fontWeight:600, marginBottom:8 }}>
⚠️ A recipe named "{r.title}" already exists locally.
</div>
<div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
{[["overwrite","Overwrite"],["copy","Save as copy"],["skip","Skip"]].map(([action,label]) => (
<button key={action}
style={{ ...S.pill(r.duplicateAction===action),
background:r.duplicateAction===action?(action==="skip"?"#7f1d1d":action==="overwrite"?"#1d4ed8":"#14532d"):"transparent",
borderColor:r.duplicateAction===action?(action==="skip"?"#ef4444":action==="overwrite"?"#3b82f6":"#22c55e"):"#334155",
color:r.duplicateAction===action?"#fff":"#94a3b8" }}
onClick={() => setSyncReviewData(prev => prev.map((item,i) => i===rIdx?{...item,duplicateAction:action}:item))}>
{label}
</button>
))}
</div>
</div>
)}

{/* Ingredient list */}
<div style={{ marginBottom:r.imported?0:10 }}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.04em" }}>
Ingredients — {matchedCount} matched{skippedCount>0?`, ${skippedCount} skipped`:""}
</div>
{r.ingredients.map((ing, iIdx) => (
<div key={iIdx} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
padding:"6px 0", borderBottom:iIdx<r.ingredients.length-1?"1px solid #1e293b":"none" }}>
<div style={{ flex:1 }}>
{ing.match && !ing.skipped ? (
<div style={{ fontSize:13, color:"#4ade80" }}>✓ {ing.match.name}</div>
) : ing.skipped && !ing.match ? (
<div style={{ fontSize:13, color:"#64748b" }}>⊘ {ing.name} <span style={{ fontSize:11 }}>(no match)</span></div>
) : ing.skipped ? (
<div style={{ fontSize:13, color:"#64748b", textDecoration:"line-through" }}>{ing.match?.name || ing.name}</div>
) : (
<div style={{ fontSize:13, color:"#fbbf24" }}>⚠ {ing.name}</div>
)}
<div style={{ fontSize:11, color:"#475569" }}>{ing.amount_g}g</div>
</div>
<div style={{ display:"flex", gap:6, alignItems:"center" }}>
{!r.imported && !ing.skipped && !ing.match && (
<button style={{ background:"#1d2d3a", border:"1px solid #334155", borderRadius:8, color:"#93c5fd",
fontSize:11, fontWeight:600, padding:"3px 8px", cursor:"pointer" }}
onClick={() => {
setNotionIngPick({ recipeIdx:rIdx, ingIdx:iIdx });
setNotionIngSearch("");
setView("notionIngPick");
}}>Pick</button>
)}
{!r.imported && (
<button style={{ background:"none", border:"none", color: ing.skipped?"#475569":"#64748b",
fontSize:11, cursor:"pointer", padding:"2px 4px" }}
onClick={() => setSyncReviewData(prev => prev.map((item,ri) =>
ri!==rIdx ? item : {
...item,
ingredients: item.ingredients.map((x,ii) =>
ii!==iIdx ? x : {...x, skipped:!x.skipped}
)
}
))}>
{ing.skipped?"Restore":"Skip"}
</button>
)}
</div>
</div>
))}
</div>

{/* Per-recipe import button */}
{!r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip" && (
<button style={{ width:"100%", padding:10, borderRadius:10, border:"none",
background: matchedCount>0?"#7c3aed":"#1e293b",
color: matchedCount>0?"#fff":"#64748b",
fontSize:13, fontWeight:700, cursor:matchedCount>0?"pointer":"default" }}
disabled={matchedCount===0}
onClick={() => { importRecipe(rIdx); }}>
Import "{r.title}"
</button>
)}
{r.imported && (
<div style={{ textAlign:"center", fontSize:13, color:"#10b981", fontWeight:600 }}>✓ Imported</div>
)}
{r.duplicateAction === "skip" && (
<div style={{ textAlign:"center", fontSize:13, color:"#475569" }}>Skipped</div>
)}
</div>
);
})}
{syncReviewData.some(r => r.imported) && (
<button style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"#7c3aed",
color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", marginTop:4 }}
onClick={importAllReady}>
Done — Save & Finish
</button>
)}
</div>
<BottomNav />
</div>
);
}

// ── NOTION INGREDIENT PICKER ──────────────────────────────────────────────
if (view === "notionIngPick" && notionIngPick) {
const filteredNotionFoods = notionIngSearch.length > 0
? allFoods.filter(f => f.name.toLowerCase().includes(notionIngSearch.toLowerCase()))
: allFoods;
const groupedNotionFoods = filteredNotionFoods.reduce((acc,f) => {
if (!acc[f.cat]) acc[f.cat]=[];
acc[f.cat].push(f);
return acc;
}, {});
const currentIng = syncReviewData[notionIngPick.recipeIdx]?.ingredients[notionIngPick.ingIdx];
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }}
onClick={() => { setNotionIngPick(null); setView("notionReview"); }}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Match Ingredient</span>
<div style={{ width:48 }} />
</div>
<div style={S.section}>
{currentIng && (
<div style={{ background:"#1c1200", border:"1px solid #92400e", borderRadius:10,
padding:"10px 14px", marginBottom:12, fontSize:13, color:"#fbbf24" }}>
Matching: <strong>{currentIng.name}</strong> ({currentIng.amount_g}g)
</div>
)}
<input style={{ ...S.input, marginBottom:12 }} placeholder="Search foods…"
value={notionIngSearch} onChange={e => setNotionIngSearch(e.target.value)} autoFocus />
<div style={{ maxHeight:"calc(100vh - 220px)", overflowY:"auto" }}>
{Object.entries(groupedNotionFoods).map(([cat,foods]) => (
<div key={cat}>
<div style={{ fontSize:11, fontWeight:700, color:"#475569", padding:"10px 0 4px",
letterSpacing:"0.05em", textTransform:"uppercase" }}>{cat}</div>
{foods.map(f => (
<div key={f.id} style={S.srchItem} onClick={() => {
setSyncReviewData(prev => prev.map((item,ri) =>
ri !== notionIngPick.recipeIdx ? item : {
...item,
ingredients: item.ingredients.map((ing, ii) =>
ii !== notionIngPick.ingIdx ? ing : { ...ing, match:f, skipped:false }
)
}
));
setNotionIngPick(null);
setView("notionReview");
}}>
<span style={{ fontSize:12, color:"#f59e0b", float:"right" }}>{f.cal} kcal/100g</span>
<div style={{ fontSize:14, fontWeight:500, color:"#e2e8f0" }}>{f.name}</div>
</div>
))}
</div>
))}
{filteredNotionFoods.length === 0 && (
<div style={{ padding:20, textAlign:"center", color:"#475569", fontSize:14 }}>
No foods found for "{notionIngSearch}"
</div>
)}
</div>
</div>
</div>
);
}

// ── DETAIL VIEWS (macro subtype) ──────────────────────────────────────────
const recipeSubtotal = (e, field) => (e.derivedIngredients||[]).reduce((s,ing) => {
const f = allFoods.find(x=>x.id===ing.foodId); return s+(f?(f[field]||0)*ing.amount_g/100:0);
}, 0);

if (view === "proDetail") {
const aaTotals = {}; AA_KEYS.forEach(k => { aaTotals[k]=0; });
dayLog.forEach(e => {
if (e.type==="exercise") return;
if (e.type==="recipe") { (e.derivedIngredients||[]).forEach(ing => { const f=allFoods.find(x=>x.id===ing.foodId); if(!f) return; AA_KEYS.forEach(k => { aaTotals[k]+=(f[k]||0)*ing.amount_g/100; }); }); return; }
const f=allFoods.find(x=>x.id===e.foodId); if(!f) return; AA_KEYS.forEach(k => { aaTotals[k]+=(f[k]||0)*e.amount/100; });
});
let limitingKey="aaLys", lowestPct=Infinity;
AA_KEYS.forEach(k => { const p=(aaTotals[k]/AA_EAR[k])*100; if(p<lowestPct){lowestPct=p;limitingKey=k;} });
const proCont = dayLog.flatMap(e => {
if (e.type==="exercise") return [];
if (e.type==="recipe") { const n=computeEntryNutrition(e.derivedIngredients||[],allFoods); return n.pro?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.pro}]:[]; }
const f=allFoods.find(x=>x.id===e.foodId); return f&&f.pro?[{name:e.foodName,label:`${e.amount}g`,value:f.pro*e.amount/100}]:[];
}).sort((a,b)=>b.value-a.value);
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Protein</span><div style={{ width:48 }} />
</div>
<div style={S.section}>
<div style={{ ...S.card, textAlign:"center" }}>
<Ring value={totals.pro} max={goals.pro} size={100} stroke={8} color={NUTRIENT_META.pro.color}>
<text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.pro*10)/10}</text>
<text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals.pro}g</text>
</Ring>
<div style={{ marginTop:12, fontSize:14, color:pct("pro")>=100?"#10b981":pct("pro")>=60?"#f59e0b":"#ef4444" }}>{pct("pro")}% of daily goal</div>
</div>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>Essential Amino Acids</div>
<div style={{ fontSize:11, color:"#475569", marginBottom:14 }}>vs IOM EAR for 70kg adult</div>
{AA_KEYS.map(k => {
const val=aaTotals[k]; const ear=AA_EAR[k]; const bp=Math.min((val/ear)*100,100); const rp=Math.round((val/ear)*100); const isLimit=k===limitingKey;
const col=rp>=100?"#10b981":rp>=60?"#3B82F6":rp>=30?"#f59e0b":"#ef4444";
return (
<div key={k} style={{ marginBottom:10 }}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
<div style={{ display:"flex", alignItems:"center", gap:6 }}>
<span style={{ fontSize:13, color:"#e2e8f0", fontWeight:isLimit?700:400 }}>{AA_LABELS[k]}</span>
{isLimit && <span style={{ fontSize:9, fontWeight:700, color:"#f59e0b", background:"rgba(245,158,11,0.15)", borderRadius:4, padding:"1px 5px" }}>LIMITING</span>}
</div>
<div style={{ textAlign:"right" }}>
<span style={{ fontSize:12, fontWeight:600, color:col }}>{rp}%</span>
<span style={{ fontSize:10, color:"#475569", marginLeft:5 }}>{Math.round(val*100)/100}g / {ear}g</span>
</div>
</div>
<div style={{ height:6, borderRadius:3, background:"#1e293b", overflow:"hidden" }}>
<div style={{ height:"100%", width:`${bp}%`, background:col, borderRadius:3, transition:"width 0.5s ease" }} />
</div>
</div>
);
})}
</div>
{proCont.length > 0 && (
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Today's Sources</div>
{proCont.map((c,i) => (
<div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:i<proCont.length-1?"1px solid #1e293b":"none" }}>
<div><div style={{ fontSize:13, color:"#e2e8f0" }}>{c.name}</div><div style={{ fontSize:11, color:"#64748b" }}>{c.label}</div></div>
<div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.pro.color }}>{Math.round(c.value*10)/10}g</div>
</div>
))}
</div>
)}
</div>
</div>
);
}

if (view === "calDetail") {
const proK=totals.pro*4, carbK=totals.carb*4, fatK=totals.fat*9, totK=proK+carbK+fatK;
const calCont = dayLog.flatMap(e => {
if(e.type==="exercise") return [];
if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n.cal?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.cal}]:[];}
const f=allFoods.find(x=>x.id===e.foodId);return f?[{name:e.foodName,label:`${e.amount}g`,value:f.cal*e.amount/100}]:[];
}).sort((a,b)=>b.value-a.value);
return (
<div style={S.app}>
<div style={S.header}>
<button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button>
<span style={{ fontSize:15, fontWeight:700 }}>Calories</span><div style={{ width:48 }} />
</div>
<div style={S.section}>
<div style={{ ...S.card, textAlign:"center" }}>
<Ring value={totals.cal} max={goals.cal} size={100} stroke={8} color={NUTRIENT_META.cal.color}>
<text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.cal)}</text>
<text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals.cal} kcal</text>
</Ring>
<div style={{ marginTop:12, fontSize:14, color:pct("cal")>=100?"#10b981":pct("cal")>=60?"#f59e0b":"#ef4444" }}>{pct("cal")}% of daily goal</div>
</div>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>Calorie Breakdown</div>
{totK>0?(<div style={{ display:"flex", height:14, borderRadius:7, overflow:"hidden", marginBottom:16, gap:1 }}>
<div style={{ width:`${(proK/totK)*100}%`, background:NUTRIENT_META.pro.color }} />
<div style={{ width:`${(carbK/totK)*100}%`, background:NUTRIENT_META.carb.color }} />
<div style={{ width:`${(fatK/totK)*100}%`, background:NUTRIENT_META.fat.color }} />
</div>):<div style={{ height:14, borderRadius:7, background:"#1e293b", marginBottom:16 }} />}
{[{key:"pro",label:"Protein",kcal:proK,grams:totals.pro,mult:"×4"},{key:"carb",label:"Carbs",kcal:carbK,grams:totals.carb,mult:"×4"},{key:"fat",label:"Fat",kcal:fatK,grams:totals.fat,mult:"×9"}].map(({key,label,kcal,grams,mult},i) => (
<div key={key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<2?"1px solid #1e293b":"none" }}>
<div style={{ display:"flex", alignItems:"center", gap:10 }}>
<div style={{ width:12, height:12, borderRadius:3, background:NUTRIENT_META[key].color, flexShrink:0 }} />
<div><div style={{ fontSize:14, color:"#e2e8f0", fontWeight:500 }}>{label}</div><div style={{ fontSize:11, color:"#64748b" }}>{Math.round(grams*10)/10}g {mult}</div></div>
</div>
<div style={{ textAlign:"right" }}>
<div style={{ fontSize:15, fontWeight:700, color:NUTRIENT_META[key].color }}>{Math.round(kcal)} kcal</div>
<div style={{ fontSize:11, color:"#64748b" }}>{totK>0?Math.round((kcal/totK)*100):0}%</div>
</div>
</div>
))}
</div>
{calCont.length>0&&<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Today's Sources</div>{calCont.map((c,i)=>(<div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:i<calCont.length-1?"1px solid #1e293b":"none" }}><div><div style={{ fontSize:13, color:"#e2e8f0" }}>{c.name}</div><div style={{ fontSize:11, color:"#64748b" }}>{c.label}</div></div><div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.cal.color }}>{Math.round(c.value)} kcal</div></div>))}</div>}
</div>
</div>
);
}

if (view === "fibDetail") {
const fibSol   = dayLog.reduce((s,e)=>{ if(e.type==="exercise") return s; if(e.type==="recipe") return s+recipeSubtotal(e,"fibSol"); const f=allFoods.find(x=>x.id===e.foodId); return s+(f?(f.fibSol||0)*e.amount/100:0); },0);
const fibInsol = dayLog.reduce((s,e)=>{ if(e.type==="exercise") return s; if(e.type==="recipe") return s+recipeSubtotal(e,"fibInsol"); const f=allFoods.find(x=>x.id===e.foodId); return s+(f?(f.fibInsol||0)*e.amount/100:0); },0);
const fibT = fibSol+fibInsol;
const fibCont = dayLog.flatMap(e => {
if(e.type==="exercise") return [];
if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fib)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fib,sol:recipeSubtotal(e,"fibSol"),insol:recipeSubtotal(e,"fibInsol")}];}
const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fib)return[];
return[{name:e.foodName,label:`${e.amount}g`,total:f.fib*e.amount/100,sol:(f.fibSol||0)*e.amount/100,insol:(f.fibInsol||0)*e.amount/100}];
}).sort((a,b)=>b.total-a.total);
return (
<div style={S.app}>
<div style={S.header}><button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button><span style={{ fontSize:15, fontWeight:700 }}>Fibre</span><div style={{ width:48 }} /></div>
<div style={S.section}>
<div style={{ ...S.card, textAlign:"center" }}>
<Ring value={totals.fib} max={goals.fib} size={100} stroke={8} color={NUTRIENT_META.fib.color}>
<text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fib*10)/10}</text>
<text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals.fib}g</text>
</Ring>
<div style={{ marginTop:12, fontSize:14, color:pct("fib")>=100?"#10b981":pct("fib")>=60?"#f59e0b":"#ef4444" }}>{pct("fib")}% of daily goal</div>
</div>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>Fibre Types</div>
{fibT>0?(<div style={{ display:"flex", height:14, borderRadius:7, overflow:"hidden", marginBottom:14, gap:1 }}><div style={{ width:`${(fibSol/fibT)*100}%`, background:FIB_SOL_COLOR }} /><div style={{ width:`${(fibInsol/fibT)*100}%`, background:FIB_INSOL_COLOR }} /></div>):<div style={{ height:14, borderRadius:7, background:"#1e293b", marginBottom:14 }} />}
{[{label:"Soluble",value:fibSol,color:FIB_SOL_COLOR,note:"Slows digestion, feeds gut bacteria, helps lower cholesterol"},{label:"Insoluble",value:fibInsol,color:FIB_INSOL_COLOR,note:"Adds bulk, speeds gut transit, supports bowel regularity"}].map(({label,value,color,note},i)=>(
<div key={label} style={{ padding:"10px 0", borderBottom:i===0?"1px solid #1e293b":"none" }}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
<div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ width:12, height:12, borderRadius:3, background:color }} /><span style={{ fontSize:14, color:"#e2e8f0", fontWeight:500 }}>{label}</span></div>
<div><span style={{ fontSize:15, fontWeight:700, color }}>{Math.round(value*10)/10}g</span><span style={{ fontSize:11, color:"#64748b", marginLeft:6 }}>{fibT>0?Math.round((value/fibT)*100):0}%</span></div>
</div>
<div style={{ fontSize:11, color:"#475569", marginTop:4, paddingLeft:22 }}>{note}</div>
</div>
))}
</div>
{fibCont.length>0&&<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Today's Sources</div>{fibCont.map((c,i)=>(<div key={i} style={{ padding:"8px 0", borderBottom:i<fibCont.length-1?"1px solid #1e293b":"none" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><div><div style={{ fontSize:13, color:"#e2e8f0" }}>{c.name}</div><div style={{ fontSize:11, color:"#64748b" }}>{c.label}</div></div><div style={{ textAlign:"right" }}><div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.fib.color }}>{Math.round(c.total*10)/10}g</div><div style={{ fontSize:10, color:"#64748b" }}>{Math.round(c.sol*10)/10} sol / {Math.round(c.insol*10)/10} insol</div></div></div></div>))}</div>}
<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fib||0)-(a.fib||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:i<7?"1px solid #1e293b":"none" }}><span style={{ fontSize:13, color:"#e2e8f0" }}>{f.name}</span><div style={{ textAlign:"right" }}><div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.fib.color }}>{Math.round((f.fib||0)*10)/10}g</div><div style={{ fontSize:10, color:"#64748b" }}>{Math.round((f.fibSol||0)*10)/10} sol / {Math.round((f.fibInsol||0)*10)/10} insol</div></div></div>))}</div>
</div>
</div>
);
}

if (view === "fatDetail") {
const fatSat  = dayLog.reduce((s,e)=>{ if(e.type==="exercise") return s; if(e.type==="recipe") return s+recipeSubtotal(e,"fatSat");  const f=allFoods.find(x=>x.id===e.foodId); return s+(f?(f.fatSat||0)*e.amount/100:0);  },0);
const fatMufa = dayLog.reduce((s,e)=>{ if(e.type==="exercise") return s; if(e.type==="recipe") return s+recipeSubtotal(e,"fatMufa"); const f=allFoods.find(x=>x.id===e.foodId); return s+(f?(f.fatMufa||0)*e.amount/100:0); },0);
const fatPufa = dayLog.reduce((s,e)=>{ if(e.type==="exercise") return s; if(e.type==="recipe") return s+recipeSubtotal(e,"fatPufa"); const f=allFoods.find(x=>x.id===e.foodId); return s+(f?(f.fatPufa||0)*e.amount/100:0); },0);
const fatT = fatSat+fatMufa+fatPufa;
const fatCont = dayLog.flatMap(e => {
if(e.type==="exercise") return [];
if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fat)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fat,sat:recipeSubtotal(e,"fatSat"),mufa:recipeSubtotal(e,"fatMufa"),pufa:recipeSubtotal(e,"fatPufa")}];}
const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fat)return[];
return[{name:e.foodName,label:`${e.amount}g`,total:f.fat*e.amount/100,sat:(f.fatSat||0)*e.amount/100,mufa:(f.fatMufa||0)*e.amount/100,pufa:(f.fatPufa||0)*e.amount/100}];
}).sort((a,b)=>b.total-a.total);
return (
<div style={S.app}>
<div style={S.header}><button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button><span style={{ fontSize:15, fontWeight:700 }}>Fat</span><div style={{ width:48 }} /></div>
<div style={S.section}>
<div style={{ ...S.card, textAlign:"center" }}>
<Ring value={totals.fat} max={goals.fat} size={100} stroke={8} color={NUTRIENT_META.fat.color}>
<text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fat*10)/10}</text>
<text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals.fat}g</text>
</Ring>
<div style={{ marginTop:12, fontSize:14, color:pct("fat")>=100?"#10b981":pct("fat")>=60?"#f59e0b":"#ef4444" }}>{pct("fat")}% of daily goal</div>
</div>
<div style={S.card}>
<div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>Fat Types</div>
{fatT>0?(<div style={{ display:"flex", height:14, borderRadius:7, overflow:"hidden", marginBottom:14, gap:1 }}><div style={{ width:`${(fatSat/fatT)*100}%`, background:FAT_SAT_COLOR }} /><div style={{ width:`${(fatMufa/fatT)*100}%`, background:FAT_MUFA_COLOR }} /><div style={{ width:`${(fatPufa/fatT)*100}%`, background:FAT_PUFA_COLOR }} /></div>):<div style={{ height:14, borderRadius:7, background:"#1e293b", marginBottom:14 }} />}
{[{label:"Saturated",value:fatSat,color:FAT_SAT_COLOR,note:"Limit where possible — raises LDL cholesterol"},{label:"Monounsaturated",value:fatMufa,color:FAT_MUFA_COLOR,note:"Heart-healthy — oleic acid from avocado, olive oil, nuts"},{label:"Polyunsaturated",value:fatPufa,color:FAT_PUFA_COLOR,note:"Includes omega-3 & omega-6 — essential, anti-inflammatory"}].map(({label,value,color,note},i)=>(
<div key={label} style={{ padding:"10px 0", borderBottom:i<2?"1px solid #1e293b":"none" }}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
<div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ width:12, height:12, borderRadius:3, background:color }} /><span style={{ fontSize:14, color:"#e2e8f0", fontWeight:500 }}>{label}</span></div>
<div><span style={{ fontSize:15, fontWeight:700, color }}>{Math.round(value*10)/10}g</span><span style={{ fontSize:11, color:"#64748b", marginLeft:6 }}>{fatT>0?Math.round((value/fatT)*100):0}%</span></div>
</div>
<div style={{ fontSize:11, color:"#475569", marginTop:4, paddingLeft:22 }}>{note}</div>
</div>
))}
</div>
{fatCont.length>0&&<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Today's Sources</div>{fatCont.map((c,i)=>(<div key={i} style={{ padding:"8px 0", borderBottom:i<fatCont.length-1?"1px solid #1e293b":"none" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><div><div style={{ fontSize:13, color:"#e2e8f0" }}>{c.name}</div><div style={{ fontSize:11, color:"#64748b" }}>{c.label}</div></div><div style={{ textAlign:"right" }}><div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.fat.color }}>{Math.round(c.total*10)/10}g</div><div style={{ fontSize:10, color:"#64748b" }}>{Math.round(c.sat*10)/10} sat · {Math.round(c.mufa*10)/10} mufa · {Math.round(c.pufa*10)/10} pufa</div></div></div></div>))}</div>}
<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fat||0)-(a.fat||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:i<7?"1px solid #1e293b":"none" }}><span style={{ fontSize:13, color:"#e2e8f0" }}>{f.name}</span><div style={{ textAlign:"right" }}><div style={{ fontSize:13, fontWeight:600, color:NUTRIENT_META.fat.color }}>{Math.round((f.fat||0)*10)/10}g</div><div style={{ fontSize:10, color:"#64748b" }}>{Math.round((f.fatSat||0)*10)/10} sat · {Math.round((f.fatMufa||0)*10)/10} mufa · {Math.round((f.fatPufa||0)*10)/10} pufa</div></div></div>))}</div>
</div>
</div>
);
}

// ── MICRO DETAIL ──────────────────────────────────────────────────────────
if (view === "detail" && detailNutrient) {
const k = detailNutrient; const meta = NUTRIENT_META[k];
const cont = dayLog.flatMap(e => {
if(e.type==="exercise") return [];
if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n[k]?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n[k]}]:[];}
const f=allFoods.find(x=>x.id===e.foodId);return f?[{name:e.foodName,label:`${e.amount}g`,value:(f[k]||0)*e.amount/100}]:[];
}).sort((a,b)=>b.value-a.value);
return (
<div style={S.app}>
<div style={S.header}><button style={{ background:"none", border:"none", color:"#94a3b8", fontSize:15, cursor:"pointer" }} onClick={() => setView("log")}>← Back</button><span style={{ fontSize:15, fontWeight:700 }}>{meta.label}</span><div style={{ width:48 }} /></div>
<div style={S.section}>
<div style={{ ...S.card, textAlign:"center" }}>
<Ring value={totals[k]} max={goals[k]} size={100} stroke={8} color={meta.color}>
<text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals[k]*10)/10}</text>
<text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals[k]} {meta.unit}</text>
</Ring>
<div style={{ marginTop:12, fontSize:14, color:pct(k)>=100?"#10b981":pct(k)>=60?"#f59e0b":"#ef4444" }}>{pct(k)}% of daily goal</div>
</div>
{cont.length>0&&<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase" }}>Today's Sources</div>{cont.map((c,i)=>(<div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #1e293b" }}><div><div style={{ fontSize:13, color:"#e2e8f0" }}>{c.name}</div><div style={{ fontSize:11, color:"#64748b" }}>{c.label}</div></div><div style={{ fontSize:13, fontWeight:600, color:meta.color }}>{Math.round(c.value*10)/10} {meta.unit}</div></div>))}</div>}
<div style={S.card}><div style={{ fontSize:13, fontWeight:700, color:"#94a3b8", marginBottom:10, textTransform:"uppercase" }}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b[k]||0)-(a[k]||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #1e293b" }}><span style={{ fontSize:13, color:"#e2e8f0" }}>{f.name}</span><span style={{ fontSize:13, fontWeight:600, color:meta.color }}>{Math.round((f[k]||0)*10)/10} {meta.unit}</span></div>))}</div>
</div>
</div>
);
}

return null;
}
