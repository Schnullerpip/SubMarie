import { Vector } from "matter-js";
export namespace TERRAIN {
    export const walls = [
        [
            Vector.create(3820.28, -10180.61),
            Vector.create(3009.6806640625, -10052.4833984375),
            Vector.create(2857.53, -10005.32),
            Vector.create(2045.57177734375, -9789.7744140625),
            Vector.create(1887.5300000000002, -9743.65),
            Vector.create(1870.4200000000003, -9524.06),
            Vector.create(2090.7300000000005, -9440.42),
            Vector.create(2200.7300000000005, -9354.12),
            Vector.create(2328.5200000000004, -9294.12),
            Vector.create(2290.299560546875, -9231.1865234375),
            Vector.create(2240.4700000000003, -9160.2),
            Vector.create(2239.96, -9007.320000000002),
            Vector.create(2321.51, -8900.940000000002),
            Vector.create(2481.05, -8820.990000000002),
            Vector.create(2358.3, -8756.910000000002),
            Vector.create(2281.9100000000003, -8643.910000000002),
            Vector.create(2136.2000000000003, -8606.600000000002),
            Vector.create(2130.00732421875, -8599.5888671875),
            Vector.create(2201.7500000000005, -8515.110000000002),
            Vector.create(2387.3900000000003, -8383.830000000002),
            Vector.create(2565.55, -8245.490000000002),
            Vector.create(2492.09, -7945.710000000002),
            Vector.create(2459.77880859375, -7859.3330078125),
            Vector.create(2336.58, -7673.430000000002),
            Vector.create(2296.33, -7372.480000000002),
            Vector.create(2448.33, -7076.760000000002),
            Vector.create(2446.6826171875, -6955.4521484375),
            Vector.create(2447.63, -6905.990000000002),
            Vector.create(2466.4100000000003, -6738.380000000002),
            Vector.create(2346.2500000000005, -6657.100000000002),
            Vector.create(2357.9400000000005, -6505.910000000003),
            Vector.create(2264.9400000000005, -6382.760000000003),
            Vector.create(2211.6300000000006, -6237.390000000003),
            Vector.create(2063.130859375, -6264.3837890625),
            Vector.create(2045.8700000000006, -6270.090000000003),
            Vector.create(1898.2400000000007, -6346.320000000002),
            Vector.create(1945.2400000000007, -6446.010000000002),
            Vector.create(1922.3700000000008, -6553.010000000002),
            Vector.create(2020.7400000000007, -6724.250000000002),
            Vector.create(1936.4400000000007, -6899.310000000002),
            Vector.create(1810.4569091796875, -6862.14404296875),
            Vector.create(1711.6000000000008, -6567.960000000002),
            Vector.create(1776.010000000001, -6096.190000000002),
            Vector.create(1791.920000000001, -5982.7800000000025),
            Vector.create(1829.69091796875, -5920.5126953125),
            Vector.create(1843.600000000001, -5878.460000000003),
            Vector.create(1789.890000000001, -5749.460000000003),
            Vector.create(1897.620000000001, -5668.250000000003),
            Vector.create(1934.240000000001, -5528.510000000003),
            Vector.create(2032.610000000001, -5424.380000000003),
            Vector.create(2151.060000000001, -5214.510000000003),
            Vector.create(2243.060791015625, -5291.32373046875),
            Vector.create(2334.640000000001, -5387.700000000003),
            Vector.create(2514.5900000000006, -5213.440000000002),
            Vector.create(2487.140000000001, -4935.930000000002),
            Vector.create(2323.420000000001, -4941.800000000002),
            Vector.create(2223.343505859375, -4913.748046875),
            Vector.create(2163.060000000001, -4907.670000000002),
            Vector.create(2002.5400000000009, -4901.460000000002),
            Vector.create(1896.230000000001, -4762.880000000002),
            Vector.create(1677.480000000001, -4626.180000000002),
            Vector.create(1776.610000000001, -4386.680000000002),
            Vector.create(1806.8714599609375, -4330.45263671875),
            Vector.create(1877.5200000000011, -4264.440000000002),
            Vector.create(2048.690000000001, -4227.960000000003),
            Vector.create(2102.060000000001, -4089.300000000003),
            Vector.create(2219.370000000001, -4102.930000000003),
            Vector.create(2378.3000000000006, -4142.400000000003),
            Vector.create(2501.9600000000005, -4251.210000000004),
            Vector.create(2528.16552734375, -4164.02392578125),
            Vector.create(2511.4200000000005, -4036.3600000000038),
            Vector.create(2571.3400000000006, -3825.820000000004),
            Vector.create(2543.5000000000005, -3659.490000000004),
            Vector.create(2392.2700000000004, -3538.9400000000037),
            Vector.create(2164.1200000000003, -3519.1200000000035),
            Vector.create(2126.864990234375, -3503.90576171875),
            Vector.create(1973.1200000000003, -3396.9600000000037),
            Vector.create(1854.1200000000003, -3394.570000000004),
            Vector.create(1837.3200000000004, -3289.780000000004),
            Vector.create(1886.9300000000003, -3176.680000000004),
            Vector.create(2025.6400000000003, -3136.310000000004),
            Vector.create(2308.88818359375, -3036.0361328125),
            Vector.create(2937.1000000000004, -2944.980000000004),
            Vector.create(3301.273681640625, -2926.8759765625),
            Vector.create(3859.76, -2930.7600000000043),
            Vector.create(3859.307373046875, -3372.05029296875),
            Vector.create(3836.711181640625, -4371.7587890625),
            Vector.create(3824.60546875, -5371.51416015625),
            Vector.create(3878.7001953125, -6369.94140625),
            Vector.create(3893.34, -6557.250000000004),
            Vector.create(3977.952880859375, -7364.87353515625),
            Vector.create(4100.79052734375, -8357.1318359375),
            Vector.create(4030.1953125, -9351.4521484375),
            Vector.create(4.75, -3206.53),
            Vector.create(-136.18959045410156, -3235.251953125),
            Vector.create(-166.1, -3233.2400000000002),
            Vector.create(-328.51, -3161.88),
            Vector.create(-398.65, -3220.27),
            Vector.create(-455.59, -3167.55),
            Vector.create(-620.77, -3140.1800000000003),
            Vector.create(-784.27, -3099.0000000000005),
            Vector.create(-814.3299999999999, -3175.1200000000003),
            Vector.create(-878.9699999999999, -3200.76),
            Vector.create(-920.1299999999999, -3249.8500000000004),
            Vector.create(-948.2239990234375, -3214.532470703125),
            Vector.create(-967.1299999999999, -3184.28),
            Vector.create(-1040.61, -3220.9900000000002),
            Vector.create(-1088.9099999999999, -3152.69),
            Vector.create(-1131.9099999999999, -3229.07),
            Vector.create(-1208.4999999999998, -3215.86),
            Vector.create(-1288.0299999999997, -3204.36),
            Vector.create(-1314.4099999999999, -3097.52),
            Vector.create(-1404.4099999999999, -3132.87),
            Vector.create(-1481.3, -3080.2799999999997),
            Vector.create(-1556.4215087890625, -3283.859619140625),
            Vector.create(-1558.58, -3292.6899999999996),
            Vector.create(-1643.1499999999999, -3499.7499999999995),
            Vector.create(-1532.6799999999998, -3561.3199999999997),
            Vector.create(-1473.4399999999998, -3667.7899999999995),
            Vector.create(-1288.1999999999998, -3735.4099999999994),
            Vector.create(-1237.0699999999997, -3911.7499999999995),
            Vector.create(-1186.2599999999998, -3996.9299999999994),
            Vector.create(-1194.6568603515625, -4016.843017578125),
            Vector.create(-1248.7699999999998, -4074.2699999999995),
            Vector.create(-1201.0799999999997, -4144.4),
            Vector.create(-1232.2099999999998, -4223.21),
            Vector.create(-1123.36, -4265.28),
            Vector.create(-1088.76, -4371.04),
            Vector.create(-1021.1, -4423.31),
            Vector.create(-1070.25, -4499.31),
            Vector.create(-1043.67, -4601.77),
            Vector.create(-1012.4000000000001, -4683.900000000001),
            Vector.create(-941.7700000000001, -4703.900000000001),
            Vector.create(-921.9954223632812, -4736.8828125),
            Vector.create(-877.3700000000001, -4775.370000000001),
            Vector.create(-744.6200000000001, -4787.610000000001),
            Vector.create(-822.4300000000001, -4885.72),
            Vector.create(-879.3100000000001, -4980.67),
            Vector.create(-965.6400000000001, -4900.52),
            Vector.create(-953.7100000000002, -4960.070000000001),
            Vector.create(-924.3500000000001, -5048.290000000001),
            Vector.create(-811.4300000000002, -5064.460000000001),
            Vector.create(-801.6900000000002, -5165.270000000001),
            Vector.create(-802.27392578125, -5179.4853515625),
            Vector.create(-897.7600000000002, -5414.270000000001),
            Vector.create(-1120.6800000000003, -5584.170000000001),
            Vector.create(-1264.6800000000003, -5819.600000000001),
            Vector.create(-1379.296875, -5961.55224609375),
            Vector.create(-1402.5000000000002, -6058.210000000001),
            Vector.create(-1329.4300000000003, -6094.160000000001),
            Vector.create(-1404.3000000000002, -6134.160000000001),
            Vector.create(-1381.41, -6204.2300000000005),
            Vector.create(-1423.28, -6264.63),
            Vector.create(-1374.45, -6355.06),
            Vector.create(-1451.04, -6442.240000000001),
            Vector.create(-1415.21, -6514.460000000001),
            Vector.create(-1340.56, -6510.250000000001),
            Vector.create(-1301.4918212890625, -6656.10595703125),
            Vector.create(-1309.08, -6682.490000000001),
            Vector.create(-1481.4299999999998, -6793.77),
            Vector.create(-1442.87, -7042.47),
            Vector.create(-1395.4699999999998, -7297.63),
            Vector.create(-1266.9699999999998, -7485.22),
            Vector.create(-1266.327392578125, -7487.2177734375),
            Vector.create(-1270.5099999999998, -7712.14),
            Vector.create(-1190.9999999999998, -7772.76),
            Vector.create(-1188.6399999999999, -7839.4800000000005),
            Vector.create(-1130.27, -7999.6900000000005),
            Vector.create(-1239.27, -8111.750000000001),
            Vector.create(-1443.7, -8198.28),
            Vector.create(-1470.5054931640625, -8204.19140625),
            Vector.create(-1577.21, -8327.2),
            Vector.create(-1523.3600000000001, -8314.36),
            Vector.create(-1539.9900000000002, -8364.17),
            Vector.create(-1409.13, -8375.65),
            Vector.create(-1365.19, -8512.89),
            Vector.create(-1272.63, -8542.769999999999),
            Vector.create(-1255.8100000000002, -8639.369999999999),
            Vector.create(-1054.26806640625, -8643.6689453125),
            Vector.create(-1017.8800000000001, -8643.519999999999),
            Vector.create(-789.8800000000001, -8695.89),
            Vector.create(-639.4300000000001, -8639.519999999999),
            Vector.create(-536.8700000000001, -8700.05),
            Vector.create(-542.6900000000002, -8792.96),
            Vector.create(-640.3500000000001, -8804.39),
            Vector.create(-698.2500000000001, -8930.01),
            Vector.create(-739.9462280273438, -9008.046875),
            Vector.create(-713.3600000000001, -9045.09),
            Vector.create(-589.0700000000002, -9119.31),
            Vector.create(-590.4700000000001, -9270.359999999999),
            Vector.create(-493.2400000000001, -9375.48),
            Vector.create(-426.3800000000001, -9489.4),
            Vector.create(-350.8000000000001, -9617.25),
            Vector.create(-515.6500000000001, -9641.58),
            Vector.create(-547.6372680664062, -9652.828125),
            Vector.create(-626.32, -9694.27),
            Vector.create(-679.51, -9585.83),
            Vector.create(-802.76, -9550.289999999999),
            Vector.create(-918.76, -9487.82),
            Vector.create(-1209.46, -9630.74),
            Vector.create(-1366.5858154296875, -9735.0322265625),
            Vector.create(-1392.96, -9831.36),
            Vector.create(-1981.06, -10014.150000000001),
            Vector.create(-2230.960693359375, -10125.1513671875),
            Vector.create(-2564.48, -10109.340000000002),
            Vector.create(-2743.572021484375, -9559.0244140625),
            Vector.create(-2854.654296875, -8570.1669921875),
            Vector.create(-2708.0634765625, -7581.32373046875),
            Vector.create(-2639.422607421875, -6584.50048828125),
            Vector.create(-2639.48, -6533.770000000002),
            Vector.create(-2639.40673828125, -5584.5029296875),
            Vector.create(-2630.966796875, -4584.5419921875),
            Vector.create(-2611.834228515625, -3584.735107421875),
            Vector.create(-2578.78, -2974.410000000002),
            Vector.create(-2199.704345703125, -2894.630126953125),
            Vector.create(-1955.0400000000002, -2874.660000000002),
            Vector.create(-1336.8600000000001, -2972.510000000002),
            Vector.create(-1218.1678466796875, -2989.835205078125),
            Vector.create(-1138.75, -2970.050000000002),
            Vector.create(-940.98, -2935.800000000002),
            Vector.create(-880.36, -2837.140000000002),
            Vector.create(-765.63, -2844.140000000002),
            Vector.create(-540.52, -2766.9400000000023),
            Vector.create(-349.38116455078125, -2905.53564453125),
            Vector.create(-345.24, -2908.0700000000024),
            Vector.create(-200.03, -2921.3700000000026),
            Vector.create(-65.03, -2975.4900000000025),
            Vector.create(161.78, -3004.4900000000025),
            Vector.create(228.48000000000002, -3234.4400000000023),
            Vector.create(210.79000000000002, -3281.2900000000022),
            Vector.create(139.73000000000002, -3242.2900000000022),
            Vector.create(87.42930603027344, -3284.401611328125),
            Vector.create(60.18000000000002, -3297.8800000000024),
            Vector.create(4.75, -3206.53),
        ],
    ];

    export const objects = [
        {
            name: "terrain01",
            position: {
                x: 3280,
                y: 4400,
            },
            vertices: [
                [
                    Vector.create(1329.37, 1173.9),
                    Vector.create(1063.06, 1251.3600000000001),
                    Vector.create(863.8399999999999, 1407.89),
                    Vector.create(630.6099999999999, 1437.25),
                    Vector.create(442.9671325683594, 1388.544921875),
                    Vector.create(413.3699999999999, 1358.04),
                    Vector.create(256.7199999999999, 1198.21),
                    Vector.create(12.36999999999992, 1191.21),
                    Vector.create(21.85999999999992, 1024.55),
                    Vector.create(64, 876.31),
                    Vector.create(161.69, 856.68),
                    Vector.create(157.1979217529297, 806.548095703125),
                    Vector.create(148.93, 760.88),
                    Vector.create(256.07, 648.19),
                    Vector.create(338.32, 516.73),
                    Vector.create(409.41999999999996, 536.02),
                    Vector.create(417.64, 463.27),
                    Vector.create(547.64, 373.72999999999996),
                    Vector.create(548.42, 211.72999999999996),
                    Vector.create(635.78, 123.88999999999996),
                    Vector.create(644.2555541992188, 89.8480453491211),
                    Vector.create(670.6, 3.4699999999999562),
                    Vector.create(748.19, 83.25999999999996),
                    Vector.create(836.0500000000001, 169.38999999999996),
                    Vector.create(814.7600000000001, 274.17999999999995),
                    Vector.create(896.1700000000001, 279.67999999999995),
                    Vector.create(968.69, 364.8399999999999),
                    Vector.create(990.12, 501.8399999999999),
                    Vector.create(859.117431640625, 613.0113525390625),
                    Vector.create(801.42, 654.6),
                    Vector.create(614.55, 808.97),
                    Vector.create(450.76, 855.97),
                    Vector.create(489.18, 1008.25),
                    Vector.create(560.28, 1119.07),
                    Vector.create(687.15, 1085.5),
                    Vector.create(756.5261840820312, 1090.23779296875),
                    Vector.create(828.02, 1075.75),
                    Vector.create(858.75, 937.84),
                    Vector.create(1090.42, 1004.0600000000001),
                ],
            ],
        },
        {
            name: "terrain02",
            position: {
                x: 4300,
                y: 7000,
            },
            vertices: [
                [
                    Vector.create(494.4, 498.08),
                    Vector.create(631.47, 403.59999999999997),
                    Vector.create(761.8000000000001, 296.19999999999993),
                    Vector.create(899.8000000000001, 300.48999999999995),
                    Vector.create(910.23, 192.73999999999995),
                    Vector.create(862.54, 81.08999999999995),
                    Vector.create(746.47, 51.699999999999946),
                    Vector.create(703.57, 0),
                    Vector.create(664.1370849609375, 46.26655197143555),
                    Vector.create(651, 53),
                    Vector.create(540.5, 61.59),
                    Vector.create(508.09000000000003, 176.45),
                    Vector.create(406.72, 206.67999999999998),
                    Vector.create(337.51000000000005, 286.2),
                    Vector.create(302.87, 221),
                    Vector.create(229.34, 223.93),
                    Vector.create(227.68, 148.81),
                    Vector.create(167.82, 189.31),
                    Vector.create(8.48, 209.2),
                    Vector.create(3.190033197402954, 268.4580993652344),
                    Vector.create(20, 372.2),
                    Vector.create(19.56, 608.5799999999999),
                    Vector.create(221.87, 704.31),
                    Vector.create(376.44, 784.4799999999999),
                    Vector.create(536.44, 851.4799999999999),
                    Vector.create(540.1080322265625, 912.244873046875),
                    Vector.create(587.2900000000001, 969.4799999999999),
                    Vector.create(702.6100000000001, 928.8699999999999),
                    Vector.create(806.3700000000001, 894.3499999999999),
                    Vector.create(764.1700000000001, 804.9099999999999),
                    Vector.create(666.8800000000001, 626.9099999999999),
                ],
            ],
        },
        {
            name: "terrain03",
            position: {
                x: 2923,
                y: 5944,
            },
            vertices: [
                [
                    Vector.create(1565.39, 1115),
                    Vector.create(1624.25, 1068.83),
                    Vector.create(1577.17, 1023.5999999999999),
                    Vector.create(1532.3000000000002, 891.5099999999999),
                    Vector.create(1382.5800000000002, 858.0699999999999),
                    Vector.create(1196.5800000000002, 694.4799999999999),
                    Vector.create(1004.1500000000001, 538.9299999999998),
                    Vector.create(1041.832763671875, 514.3883056640625),
                    Vector.create(1098.47, 502.92999999999984),
                    Vector.create(1134.47, 434.4399999999998),
                    Vector.create(1021.1500000000001, 310.1299999999998),
                    Vector.create(847.0500000000001, 259.41999999999985),
                    Vector.create(689.0500000000001, 119.90999999999985),
                    Vector.create(523.3, 8.12),
                    Vector.create(435.1277770996094, 2.736220598220825),
                    Vector.create(360.23999999999995, 9.01),
                    Vector.create(270.86999999999995, 155.51999999999998),
                    Vector.create(159.89, 375.16),
                    Vector.create(264.61, 583.48),
                    Vector.create(284.4750061035156, 827.7964477539062),
                    Vector.create(280.7, 847.55),
                    Vector.create(209.06, 1109.74),
                    Vector.create(22.170000000000016, 1301.59),
                    Vector.create(10.870000000000015, 1568.84),
                    Vector.create(17.02355194091797, 1730.921875),
                    Vector.create(45.06000000000002, 1808.61),
                    Vector.create(246.46000000000004, 1920.3999999999999),
                    Vector.create(282.81000000000006, 1881.05),
                    Vector.create(213.92000000000007, 1825.75),
                    Vector.create(227.08000000000007, 1562.75),
                    Vector.create(317.8379211425781, 1338.174072265625),
                    Vector.create(328.2600000000001, 1334.04),
                    Vector.create(428.6800000000001, 1325.3899999999999),
                    Vector.create(429.41000000000014, 1220.7299999999998),
                    Vector.create(527.3100000000002, 1167.11),
                    Vector.create(593.1400000000002, 1077.6899999999998),
                    Vector.create(707.1400000000002, 1061.7799999999997),
                    Vector.create(687.4100000000002, 940.7799999999997),
                    Vector.create(748.0100000000002, 912.2799999999997),
                    Vector.create(754.8400000000003, 853.5799999999997),
                    Vector.create(795.6000000000003, 968.4199999999997),
                    Vector.create(824.7699584960938, 1001.4376831054688),
                    Vector.create(876.8500000000003, 1059.5599999999997),
                    Vector.create(849.6500000000002, 1167.7199999999998),
                    Vector.create(940.1300000000002, 1224.2599999999998),
                    Vector.create(857.7100000000003, 1374.0199999999998),
                    Vector.create(816.7800000000003, 1535.0199999999998),
                    Vector.create(682.5200000000003, 1641.7399999999998),
                    Vector.create(684.2400000000004, 1785.7399999999998),
                    Vector.create(698.655517578125, 1805.0029296875),
                    Vector.create(753.9400000000004, 1885.2199999999998),
                    Vector.create(833.4800000000004, 1798.9099999999999),
                    Vector.create(975.7200000000004, 1822.9099999999999),
                    Vector.create(1118.7200000000003, 1873.9099999999999),
                    Vector.create(1160.0000000000002, 1983.06),
                    Vector.create(1262.3200000000002, 1929.73),
                    Vector.create(1333.5300000000002, 1908.73),
                    Vector.create(1294.9700000000003, 1842.15),
                    Vector.create(1337.0074462890625, 1794.046142578125),
                    Vector.create(1384.0400000000002, 1755.95),
                    Vector.create(1458.4700000000003, 1657.8700000000001),
                    Vector.create(1690.3800000000003, 1521.5200000000002),
                    Vector.create(1701.0700000000004, 1251.4),
                    Vector.create(1685.3600000000004, 1146.93),
                ],
            ],
        },
        {
            name: "terrain04",
            position: {
                x: 4240,
                y: 3546,
            },
            vertices: [
                [
                    Vector.create(599.21, 379.67),
                    Vector.create(768.21, 360.31),
                    Vector.create(891.82, 271.01),
                    Vector.create(1014.49, 145.42),
                    Vector.create(967.4, 12.349999999999994),
                    Vector.create(767.94, 28.75),
                    Vector.create(693.9579467773438, 119.8345718383789),
                    Vector.create(605.61, 189.83),
                    Vector.create(421.99, 135.64000000000001),
                    Vector.create(327.57, 293.27),
                    Vector.create(178.7, 428.55999999999995),
                    Vector.create(187.61999999999998, 612.76),
                    Vector.create(182.59629821777344, 702.4866943359375),
                    Vector.create(175.39999999999998, 744.5699999999999),
                    Vector.create(187.48999999999998, 883.4399999999999),
                    Vector.create(127.34999999999998, 1043.9299999999998),
                    Vector.create(110, 1186),
                    Vector.create(2.819999999999993, 1219.37),
                    Vector.create(60.10999999999999, 1316.12),
                    Vector.create(170.23, 1357.7199999999998),
                    Vector.create(251.64639282226562, 1314.6466064453125),
                    Vector.create(303.23, 1308.6299999999999),
                    Vector.create(437.59000000000003, 1398.1599999999999),
                    Vector.create(511.34000000000003, 1430.9999999999998),
                    Vector.create(549.45, 1360.6999999999998),
                    Vector.create(441.1700000000001, 1197.0099999999998),
                    Vector.create(531.1700000000001, 1069.8399999999997),
                    Vector.create(503.45000000000005, 930.9299999999997),
                    Vector.create(495.0738525390625, 864.0810546875),
                    Vector.create(488.6, 792.52),
                    Vector.create(442.33000000000004, 662.24),
                    Vector.create(535, 529.7),
                ],
            ],
        },
        {
            name: "terrain05",
            position: {
                x: 2420,
                y: 3246,
            },
            vertices: [
                [
                    Vector.create(120.1, 541.47),
                    Vector.create(0.59, 732.58),
                    Vector.create(26.86, 955.86),
                    Vector.create(17.93, 1160.7),
                    Vector.create(161.25, 1318.0700000000002),
                    Vector.create(201.6110382080078, 1432.88671875),
                    Vector.create(242.63, 1547.13),
                    Vector.create(413, 1726.45),
                    Vector.create(517.53, 1770.97),
                    Vector.create(585.29, 1658.8),
                    Vector.create(670.02, 1564.45),
                    Vector.create(624.6999999999999, 1451.5700000000002),
                    Vector.create(563.687255859375, 1353.618408203125),
                    Vector.create(530.6999999999999, 1331.7500000000002),
                    Vector.create(359.40999999999997, 1288.5900000000001),
                    Vector.create(345.07, 1161.0600000000002),
                    Vector.create(285.15999999999997, 1047.8200000000002),
                    Vector.create(513.25, 906.1600000000002),
                    Vector.create(735.3701782226562, 806.2769775390625),
                    Vector.create(762.61, 817.2400000000002),
                    Vector.create(886.02, 804.7900000000002),
                    Vector.create(875.34, 636.8800000000002),
                    Vector.create(987.53, 441.2700000000002),
                    Vector.create(1138.59, 297.7500000000002),
                    Vector.create(1316.4075927734375, 286.33197021484375),
                    Vector.create(1323.8899999999999, 279.7500000000002),
                    Vector.create(1394.3, 115.35000000000022),
                    Vector.create(1253.75, 108.03000000000023),
                    Vector.create(1091.4, 166.23000000000025),
                    Vector.create(1021.69, 125.61000000000024),
                    Vector.create(980.1800000000001, 200.19000000000023),
                    Vector.create(914.8100000000001, 168.34000000000023),
                    Vector.create(868.32, 224.62000000000023),
                    Vector.create(812.32, 148.78000000000023),
                    Vector.create(788.0573120117188, 133.49224853515625),
                    Vector.create(738.95, 94.24000000000024),
                    Vector.create(756.36, 1.83),
                    Vector.create(676, 31.48),
                    Vector.create(494.17, 53.67),
                    Vector.create(319, 135.64),
                    Vector.create(125.91999999999999, 260.13),
                    Vector.create(122.36988830566406, 357.88043212890625),
                ],
            ],
        },
        {
            name: "terrain06",
            position: {
                x: 3920,
                y: 1632,
            },
            vertices: [
                [
                    Vector.create(251.53, 1482.94),
                    Vector.create(371.40999999999997, 1500.24),
                    Vector.create(428.15999999999997, 1379.24),
                    Vector.create(534.92, 1353.94),
                    Vector.create(595.9699999999999, 1253.74),
                    Vector.create(809.68, 1386.74),
                    Vector.create(1015.68, 1520.6100000000001),
                    Vector.create(1017.9215698242188, 1525.063232421875),
                    Vector.create(1019.5999999999999, 1680.9),
                    Vector.create(1096, 1821),
                    Vector.create(1023, 2124.93),
                    Vector.create(1176.59, 2332.21),
                    Vector.create(1245.2264404296875, 2350.762451171875),
                    Vector.create(1326.59, 2330.46),
                    Vector.create(1356.12, 2170.69),
                    Vector.create(1437.2299999999998, 2111.69),
                    Vector.create(1468.2299999999998, 2020.52),
                    Vector.create(1576.7699999999998, 2011.07),
                    Vector.create(1599.0599999999997, 1885.3),
                    Vector.create(1678.7799999999997, 1948.5),
                    Vector.create(1775.1499999999996, 1922.31),
                    Vector.create(1841.5692138671875, 1975.044677734375),
                    Vector.create(1896.2999999999997, 2011.6599999999999),
                    Vector.create(2001.8699999999997, 1928.84),
                    Vector.create(2124.74, 1756.84),
                    Vector.create(2025.7399999999998, 1572.84),
                    Vector.create(1990.12, 1460.59),
                    Vector.create(1870.12, 1443.2099999999998),
                    Vector.create(1794.310302734375, 1353.044921875),
                    Vector.create(1738.12, 1275.0599999999997),
                    Vector.create(1599.12, 1114.0599999999997),
                    Vector.create(1657.58, 1003.3299999999997),
                    Vector.create(1634, 881.1999999999997),
                    Vector.create(1686.78, 889.1999999999997),
                    Vector.create(1634, 881.1999999999997),
                    Vector.create(1694.76, 867.0099999999996),
                    Vector.create(1650.86, 822.8999999999996),
                    Vector.create(1731.86, 789.7999999999996),
                    Vector.create(1744.1999999999998, 704.5499999999996),
                    Vector.create(1760.120361328125, 696.6905517578125),
                    Vector.create(1842.0499999999997, 681.3499999999996),
                    Vector.create(1784.5699999999997, 619.9299999999996),
                    Vector.create(1764.9199999999996, 537.2799999999996),
                    Vector.create(1680.3299999999997, 533.1299999999997),
                    Vector.create(1581.5199999999998, 454.42999999999967),
                    Vector.create(1495, 559.53),
                    Vector.create(1388.34, 545.41),
                    Vector.create(1295.1999999999998, 528.3299999999999),
                    Vector.create(1270.7199999999998, 409.5299999999999),
                    Vector.create(1238.6884765625, 403.5255126953125),
                    Vector.create(1150.6399999999999, 408.6499999999999),
                    Vector.create(1091.2399999999998, 320.4199999999999),
                    Vector.create(1080.7999999999997, 224.4199999999999),
                    Vector.create(1170.3299999999997, 185.2899999999999),
                    Vector.create(1131.4199999999996, 101.1999999999999),
                    Vector.create(979.73, 0.72),
                    Vector.create(777.91, 89.24),
                    Vector.create(712.0668334960938, 58.318172454833984),
                    Vector.create(647.04, 23.08999999999999),
                    Vector.create(509.41, 64.65),
                    Vector.create(526.4100000000001, 72.4),
                    Vector.create(560.5400000000001, 83.28),
                    Vector.create(431, 25.71),
                    Vector.create(311.26, 73.57),
                    Vector.create(366.37, 272.57),
                    Vector.create(578.9523315429688, 343.6252136230469),
                    Vector.create(589.06, 346.4),
                    Vector.create(636.17, 435.4),
                    Vector.create(712.62, 500.27),
                    Vector.create(665.21, 542.15),
                    Vector.create(725.5600000000001, 559.78),
                    Vector.create(816.5600000000001, 791.47),
                    Vector.create(1058.78, 840.24),
                    Vector.create(1096.35, 917.6800000000001),
                    Vector.create(1146.1075439453125, 937.31201171875),
                    Vector.create(1175.24, 956.08),
                    Vector.create(1165.57, 1053.14),
                    Vector.create(1255.96, 1040.65),
                    Vector.create(1346.96, 1120.65),
                    Vector.create(1452.96, 1181.75),
                    Vector.create(1067.15, 1164.66),
                    Vector.create(952.1251220703125, 1154.275634765625),
                    Vector.create(678.3100000000002, 1136.97),
                    Vector.create(539.2600000000002, 1033.3400000000001),
                    Vector.create(411.9100000000002, 1096.1100000000001),
                    Vector.create(271.1800000000002, 1159.41),
                    Vector.create(133.33000000000018, 1234.2800000000002),
                    Vector.create(78.16547393798828, 1193.6788330078125),
                    Vector.create(60.85000000000018, 1186.4900000000002),
                    Vector.create(21.24000000000018, 1255.6700000000003),
                    Vector.create(62.77000000000018, 1417.4000000000003),
                ],
            ],
        },
    ];
}