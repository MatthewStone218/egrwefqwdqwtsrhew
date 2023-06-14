﻿AudioWorkletProcessor.prototype._l1=function(){this._m1=true;this.port.onmessage=(_n1)=>{if(_n1.data==="kill")this._m1=false;};};class _o1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._l1();}process(_p1,_q1,parameters){const _r1=_p1[0];for(let c=0;c<_r1.length;++c){const _s1=_r1[c];for(let _t1=0;_t1<_s1.length;++_t1)_q1[parameters.bypass[_t1]??parameters.bypass[0]][c][_t1]=_s1[_t1];
}return this._m1;}}class _u1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._l1();}process(_p1,_q1,parameters){const _v1=_p1[0];const _w1=_p1[1];const _x1=_q1[0];const gain=parameters.gain;for(let c=0;c<_w1.length;++c){const _s1=_w1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1)_y1[_t1]=_s1[_t1];}for(let c=0;c<_v1.length;++c){const _s1=_v1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1)_y1[_t1]+=_s1[_t1]*(gain[_t1]??gain[0]);
}return this._m1;}}registerProcessor("audio-bus-input",_o1);registerProcessor("audio-bus-output",_u1);class _z1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100},{name:"resolution",automationRate:"a-rate",defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",
defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _A1=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_B1){super();this._l1();const _C1=_B1.outputChannelCount[0];this._D1=new Float32Array(_C1);this._E1=new Uint32Array(_C1);}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const gain=parameters.gain;const factor=parameters.factor;const resolution=parameters.resolution;const mix=parameters.mix;for(let c=0;c<_r1.length;
++c){const _s1=_r1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){_y1[_t1]=_s1[_t1];if(this._E1[c]===0)this._D1[c]=_s1[_t1];++this._E1[c];this._E1[c]%=(factor[_t1]??factor[0]);if(bypass[_t1]??bypass[0])continue;let _F1=this._D1[c];const _G1=(gain[_t1]??gain[0]);_F1*=_G1;_F1=Math.max(Math.min(_F1,1.0),-1.0);const _H1=resolution[_t1]??resolution[0];const max=(_F1>0.0)?_z1._A1[_H1]-1:_z1._A1[_H1];_F1=Math.round(_F1*max)/max;const _I1=(mix[_t1]??mix[0]);_y1[_t1]*=(1.0-_I1);_y1[_t1]+=(_F1*_I1);}}return this._m1;
}}registerProcessor("bitcrusher-processor",_z1);class _J1 extends AudioWorkletProcessor{static _K1=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_J1._K1},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_B1){super();this._l1();
const _C1=_B1.outputChannelCount[0];const _L1=(_J1._K1*sampleRate)+1;this.buffer=new Array(_C1);this._M1=new Uint32Array(_C1);for(let c=0;c<_C1;++c)this.buffer[c]=new Float32Array(_L1);}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<_r1.length;++c){const _s1=_r1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){_y1[_t1]=_s1[_t1];const _N1=this._O1(c,(time[_t1]??time[0]));
const _P1=_s1[_t1]+(_N1*(feedback[_t1]??feedback[0]));this.write(c,_P1);if((bypass[_t1]??bypass[0]))continue;const _I1=(mix[_t1]??mix[0]);_y1[_t1]*=(1-_I1);_y1[_t1]+=(_N1*_I1);}}return this._m1;}_O1(_Q1,_R1){const _S1=_R1*sampleRate;let _T1=(this._M1[_Q1]-~~_S1);let _U1=(_T1-1);while(_T1<0)_T1+=this.buffer[_Q1].length;while(_U1<0)_U1+=this.buffer[_Q1].length;const frac=_S1-~~_S1;const _V1=this.buffer[_Q1][_T1];const _W1=this.buffer[_Q1][_U1];return _V1+(_W1-_V1)*frac;}write(_Q1,_X1){++this._M1[_Q1];this._M1[_Q1]%=this.buffer[_Q1].length;
this.buffer[_Q1][this._M1[_Q1]]=_X1;}}registerProcessor("delay-processor",_J1);class _Y1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._l1();}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<_r1.length;++c){const _s1=_r1[c];const _y1=_x1[c];
for(let _t1=0;_t1<_s1.length;++_t1){_y1[_t1]=_s1[_t1];if(bypass[_t1]??bypass[0])continue;_y1[_t1]*=(gain[_t1]??gain[0]);}}return this._m1;}}registerProcessor("gain-processor",_Y1);class _Z1 extends AudioWorkletProcessor{static get parameterDescriptors(){const __1=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(1500.0,__1),minValue:10.0,maxValue:__1},{name:"q",automationRate:"a-rate",
defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_B1){super();this._l1();const _C1=_B1.outputChannelCount[0];this._02=0;this._12=0;this._22=0;this._32=0;this._42=0;this._52=new Float32Array(_C1);this._62=new Float32Array(_C1);this._72=new Float32Array(_C1);this._82=new Float32Array(_C1);this._92=-1;this._a2=-1;}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _b2=(cutoff.length===1&&q.length===1);
if(_b2)this._c2(cutoff[0],q[0]);for(let c=0;c<_r1.length;++c){const _s1=_r1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){if(!_b2)this._c2(cutoff[_t1]??cutoff[0],q[_t1]??q[0]);const _d2=this._22*_s1[_t1]+this._32*this._52[c]+this._42*this._62[c]-this._02*this._72[c]-this._12*this._82[c];this._62[c]=this._52[c];this._52[c]=_s1[_t1];this._82[c]=this._72[c];this._72[c]=_d2;_y1[_t1]=(bypass[_t1]??bypass[0])?_s1[_t1]:_d2;}}return this._m1;}_c2(_e2,_f2){if(_e2===this._92&&_f2===this._a2)return;const _g2=2*Math.PI*_e2/sampleRate;
const alpha=Math.sin(_g2)/(2*_f2);const _h2=Math.cos(_g2);const _i2=1+alpha;const _02=-2*_h2;const _12=1-alpha;const _22=(1+_h2)/2;const _32=-1-_h2;const _42=(1+_h2)/2;this._02=_02/_i2;this._12=_12/_i2;this._22=_22/_i2;this._32=_32/_i2;this._42=_42/_i2;this._92=_e2;this._a2=_f2;}}registerProcessor("hpf2-processor",_Z1);class _j2 extends AudioWorkletProcessor{static get parameterDescriptors(){const __1=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}
,{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,__1),minValue:10.0,maxValue:__1},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_B1){super();this._l1();const _C1=_B1.outputChannelCount[0];this._02=0;this._12=0;this._22=0;this._32=0;this._42=0;this._52=new Float32Array(_C1);this._62=new Float32Array(_C1);this._72=new Float32Array(_C1);this._82=new Float32Array(_C1);this._92=-1;this._a2=-1;}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];
const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _b2=(cutoff.length===1&&q.length===1);if(_b2)this._c2(cutoff[0],q[0]);for(let c=0;c<_r1.length;++c){const _s1=_r1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){if(!_b2)this._c2(cutoff[_t1]??cutoff[0],q[_t1]??q[0]);const _d2=this._22*_s1[_t1]+this._32*this._52[c]+this._42*this._62[c]-this._02*this._72[c]-this._12*this._82[c];this._62[c]=this._52[c];this._52[c]=_s1[_t1];this._82[c]=this._72[c];this._72[c]=_d2;
_y1[_t1]=(bypass[_t1]??bypass[0])?_s1[_t1]:_d2;}}return this._m1;}_c2(_e2,_f2){if(_e2===this._92&&_f2===this._a2)return;const _g2=2*Math.PI*_e2/sampleRate;const alpha=Math.sin(_g2)/(2*_f2);const _h2=Math.cos(_g2);const _i2=1+alpha;const _02=-2*_h2;const _12=1-alpha;const _22=(1-_h2)/2;const _32=1-_h2;const _42=(1-_h2)/2;this._02=_02/_i2;this._12=_12/_i2;this._22=_22/_i2;this._32=_32/_i2;this._42=_42/_i2;this._92=_e2;this._a2=_f2;}}registerProcessor("lpf2-processor",_j2);class _k2{constructor(_l2){this._m2=0;
this._n2=0;this.feedback=0;this._o2=0;this.buffer=new Float32Array(_l2);this._p2=0;}process(_X1){const out=this.buffer[this._p2];this._o2=(this._o2*this._m2)+(out*this._n2);this.buffer[this._p2]=_X1+(this._o2*this.feedback);++this._p2;this._p2%=this.buffer.length;return out;}_q2(_r2){this.feedback=Math.min(Math.max(0,_r2),1);}_s2(_t2){this._m2=Math.min(Math.max(0,_t2),1);this._n2=1-this._m2;}}class _u2{constructor(_l2){this.feedback=0;this.buffer=new Float32Array(_l2);this._p2=0;}process(_X1){const out=this.buffer[this._p2];
this.buffer[this._p2]=_X1+(out*this.feedback);++this._p2;this._p2%=this.buffer.length;return(out-_X1);}_q2(_r2){this.feedback=Math.min(Math.max(0,_r2),1);}}class _v2 extends AudioWorkletProcessor{static _w2=8;static _x2=4;static _y2=0.015;static _z2=0.4;static _A2=0.28;static _B2=0.7;static _C2=[1116,1188,1277,1356,1422,1491,1557,1617];static _D2=[1139,1211,1300,1379,1445,1514,1580,1640];static _E2=[556,441,341,225];static _F2=[579,464,364,248];static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_B1){super();this._l1();const _C1=_B1.outputChannelCount[0];this._G2=-1;this._H2=-1;this._I2=new Array(_C1);this._J2=new Array(_C1);const _K2=[_v2._C2,_v2._D2];const _L2=[_v2._E2,_v2._F2];for(let c=0;c<_C1;++c){
this._I2[c]=new Array(_v2._w2);this._J2[c]=new Array(_v2._x2);for(let i=0;i<_v2._w2;++i)this._I2[c][i]=new _k2(_K2[c%_K2.length][i]);for(let i=0;i<_v2._x2;++i)this._J2[c][i]=new _u2(_L2[c%_L2.length][i]);}this._M2(0.5);this._s2(0.5);for(let c=0;c<_C1;++c)for(let i=0;i<_v2._x2;++i)this._J2[c][i]._q2(0.5);}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let c=0;c<_r1.length;++c){const _s1=_r1[c];
const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){this._M2(size[_t1]??size[0]);this._s2(damp[_t1]??damp[0]);_y1[_t1]=_s1[_t1];let out=0;const _F1=_s1[_t1]*_v2._y2;for(let i=0;i<_v2._w2;++i)out+=this._I2[c][i].process(_F1);for(let i=0;i<_v2._x2;++i)out=this._J2[c][i].process(out);if(bypass[_t1]??bypass[0])continue;const _I1=(mix[_t1]??mix[0]);_y1[_t1]*=(1-_I1);_y1[_t1]+=(out*_I1);}}return this._m1;}_M2(_l2){if(_l2===this._G2)return;const size=(_l2*_v2._A2)+_v2._B2;for(let c=0;c<this._I2.length;++c)for(let i=0;
i<_v2._w2;++i)this._I2[c][i]._q2(size);this._G2=_l2;}_s2(_t2){if(_t2===this._H2)return;const damp=_t2*_v2._z2;for(let c=0;c<this._I2.length;++c)for(let i=0;i<_v2._w2;++i)this._I2[c][i]._s2(damp);this._H2=_t2;}}registerProcessor("reverb1-processor",_v2);class _N2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",
automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_B1){super();this._l1();const _C1=_B1.outputChannelCount[0];this._O2=new Array(_C1).fill(1.0);this._P2=new Array(_C1).fill(0.0);this._Q2=new Array(_C1).fill(_R2._S2._T2);this._U2=new Array(_C1);for(let c=0;c<_C1;++c){this._U2[c]=new _V2();this._U2[c]._W2(sampleRate);
this._U2[c]._X2(this._O2[c]);this._U2[c]._Y2(this._Q2[c]);if(c%2===1){this._U2[c]._Z2(this._P2[c]);}}}process(_p1,_q1,parameters){const _r1=_p1[0];const _x1=_q1[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<_r1.length;++c){const _s1=_r1[c];const _y1=_x1[c];for(let _t1=0;_t1<_s1.length;++_t1){_y1[_t1]=_s1[_t1];const _H1=rate[_t1]??rate[0];const __2=offset[_t1]??offset[0];const _03=shape[_t1]??shape[0];
this._13(c,_H1,__2,_03);const _23=this._U2[c]._O1();if((bypass[_t1]??bypass[0])>0.0){continue;}const i=intensity[_t1]??intensity[0];const out=_s1[_t1]*_23*i;_y1[_t1]*=(1.0-i);_y1[_t1]+=out;}}return this._m1;}_13(_Q1,_33,_43,_53){if(_33!==this._O2[_Q1]){this._U2[_Q1]._X2(_33);this._O2[_Q1]=_33;}if(_43!==this._P2[_Q1]){if(_Q1%2===1){this._U2[_Q1]._Z2(_43);}this._P2[_Q1]=_43;}if(_53!==this._Q2[_Q1]){this._U2[_Q1]._Y2(_53);this._Q2[_Q1]=_53;}}}registerProcessor("tremolo-processor",_N2);function _R2(){}_R2._S2={
_T2:0,_63:1,_73:2,_83:3,_93:4,_a3:5};_R2._b3=function(_c3){return 1.0-_c3;};_R2._d3=function(_c3){return _c3;};_R2._e3=function(_c3){return 0.5*(Math.sin((_c3*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_R2._f3=function(_c3){if(_c3<0.5){return 0.0;}return 1.0;};_R2._g3=function(_c3){if(_c3<0.5){return 2.0*_c3;}return 2.0-(2.0*_c3);};_R2._h3=[_R2._b3,_R2._d3,_R2._e3,_R2._f3,_R2._g3];_i3._j3=512;_i3._k3=1.0/_i3._j3;function _i3(_l3){this.data=new Float32Array(_i3._j3);for(let i=0;i<_i3._j3;++i){this.data[i]=_l3(i*_i3._k3);
}}_i3.prototype._O1=function(_c3){_c3=Math.max(0.0,_c3);_c3=Math.min(_c3,1.0);const _m3=_c3*_i3._j3;const _n3=~~_m3;const _o3=_m3-_n3;let _T1=_n3;let _U1=_T1+1;if(_T1>=_i3._j3){_T1-=_i3._j3;}if(_U1>=_i3._j3){_U1-=_i3._j3;}const _V1=this.data[_T1];const _W1=this.data[_U1];return _V1+(_W1-_V1)*_o3;};_V2._p3=[];_V2._q3=false;_V2._r3=0.0;_V2._s3=20.0;function _V2(){this._t3=48000;this.shape=_R2._S2._73;this._u3=1.0;this._v3=0.0;this._k3=0.0;this._w3=0.0;if(_V2._q3==true){return;}for(let i=0;i<_R2._S2._a3;++i){
_V2._p3[i]=new _i3(_R2._h3[i]);}_V2._q3=true;}_V2._x3=function(){return(_V2._q3==true);};_V2.prototype._W2=function(_y3){this._t3=_y3;this._z3();};_V2.prototype._X2=function(_A3){_A3=Math.max(_V2._r3,_A3);_A3=Math.min(_A3,_V2._s3);this._u3=_A3;this._z3();};_V2.prototype._Z2=function(_43){_43=Math.max(0.0,_43);_43=Math.min(_43,1.0);const _B3=_43-this._w3;this._w3=_43;this._v3+=_B3;while(this._v3>=1.0){this._v3-=1.0;}while(this._v3<0.0){this._v3+=1.0;}};_V2.prototype._Y2=function(_53){_53=Math.max(0,
_53);_53=Math.min(_53,_R2._S2._a3-1);this.shape=_53;};_V2.prototype._O1=function(){const result=_V2._p3[this.shape]._O1(this._v3);this._v3+=this._k3;while(this._v3>=1.0){this._v3-=1.0;}return result;};_V2.prototype._z3=function(){this._k3=this._u3/this._t3;};