# Con  ambulancia
import json
import time
import skfuzzy as fuzz
import logging
import sys
import math

#Funcion triangular y trapecio 
def Trapezoidal(x,a,b,c,d):
  r=0
  if a<x<=b:
    r=(x-a)/(b-a)
  if b<x<=c:
    r=1
  if c<x<=d:
    r=(d-x)/(d-c)
  if x<=a or d<x:
    r=0
  return r

def Triangular(x,a,b,c):
  r=0
  if a<x<=b:
    r=(x-a)/(b-a)
  if b<x<=c:
    r=(c-x)/(c-b)
  if x<=a or c<x:
    r=0
  return r

def interseccion1(a,b):
  c=a
  for i in range(len(a)):
    if b[i]<=a[i]:
      c[i]=b[i]
  return c

def union1(a,b):
  c=a
  for i in range(len(a)):
    if b[i]>=a[i]:
      c[i]=b[i]
  return c

#Rango de valores de entradas y salidas
EjePeatones=range(0,101)
EejeVehicular=range(0,151)
EejeSalida=range(75,150)

#Entradas
#P(N/S) y P(E,OE)
PeatonalEscaso=[Trapezoidal(i,-40,-22,20,40) for i in EjePeatones]
PeatonalRegular=[Triangular(i,30,50,70) for i in EjePeatones]
PeatonalExcesivo=[Trapezoidal(i,60,80,110,130) for i in EjePeatones]

#V(N/S) y V(E,OE)
VehiculosEscaso=[Trapezoidal(i,-67,-24,24,57) for i in EejeVehicular]
VehiculosRegular=[Triangular(i,38,71,104) for i in EejeVehicular]
VehiculosExcesivo=[Trapezoidal(i,83,123,160,200) for i in EejeVehicular]


#Salidas
#T(SV(N/S)) y T(SV(E/OE))
TiempoBajo=[Trapezoidal(i,45,75,99,110) for i in EejeSalida]
TiempoMedio=[Triangular(i,100,120,135) for i in EejeSalida]
TiempoAlto=[Trapezoidal(i,125,139,150,160) for i in EejeSalida]


#Agrupación de entradas, para el sistema de inferencia Mamdani
SP_NS=[PeatonalEscaso,PeatonalRegular,PeatonalExcesivo]
SP_EOE=[PeatonalEscaso,PeatonalRegular,PeatonalExcesivo]

SV_NS=[VehiculosEscaso,VehiculosRegular,VehiculosExcesivo]
SV_EOE=[VehiculosEscaso,VehiculosRegular,VehiculosExcesivo]

#Agrupación de salidas, para el sistema de inferencia Mamdani
Tiempo_NS=[TiempoBajo,TiempoMedio,TiempoAlto]
Tiempo_EOE=[TiempoBajo,TiempoMedio,TiempoAlto]



## Reglas de inferencia y defuzzificación de Semáforo vehicular (Norte-Sur)
#W numero de Peatones N/S
#X Numero de Vehiculos N/S
#Y Numero de peatones E/OE
#z Numero de Vehiculos E/OE

def SalidaSV_T_NS(SP_NS,SP_EOE,SV_NS,SV_EOE,Tiempo_NS,w,x,y,z,EejeSalida):
  Bajo=[0]*17
  Medio=[0]*35
  Alto=[0]*29
  #Si w 
  Bajo[0] =min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[1] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[2] =min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[3] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[4] =min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[5] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z])
  Bajo[6] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z])
  Bajo[7] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Bajo[8] =min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z])
  Bajo[9] =min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z])
  Bajo[10]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z])
  Bajo[11]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z])
  Bajo[12]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z])
  Bajo[13]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Bajo[14]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Bajo[15]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
  Bajo[16]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
    
  Medio[0]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Medio[1]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Medio[2]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Medio[3]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Medio[4]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Medio[5]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Medio[6]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[7]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[8]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[9]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[10]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[11]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[12]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[13]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[14]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[15]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[16]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[17]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[18]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[19]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[20]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[21]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[22]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[23]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[24]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z])
  Medio[25]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z])
  Medio[26]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z])
  Medio[27]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Medio[28]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Medio[29]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Medio[30]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Medio[31]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Medio[32]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Medio[33]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Medio[34]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
  
  Alto[0]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Alto[1]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Alto[2]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Alto[3]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Alto[4]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Alto[5]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Alto[6]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Alto[7]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[0][z])
  Alto[8]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[0][z])
  Alto[9]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[0][z])
  Alto[10]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Alto[11]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Alto[12]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Alto[13]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Alto[14]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Alto[15]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Alto[16]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z])
  Alto[17]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])
  Alto[18]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])
  Alto[19]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])
  Alto[20]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[21]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[22]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[23]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[24]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[25]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[26]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[27]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[28]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])

  Bajo1=max(Bajo)
  Medio1=max(Medio)
  Alto1=max(Alto)
  
  
  Bajo1=[Bajo1]*len(Tiempo_NS[0]) 
  Medio1=[Medio1]*len(Tiempo_NS[1])
  Alto1=[Alto1]*len(Tiempo_NS[2])

  Bajo1aux=interseccion1(Bajo1,Tiempo_NS[0][:])
  Medio1aux=interseccion1(Medio1,Tiempo_NS[1][:])
  Alto1aux=interseccion1(Alto1,Tiempo_NS[2][:])
  
  
  ConjuntoRecortado=union1(Bajo1aux,Medio1aux)
  Conjuntorecortado=union1(ConjuntoRecortado,Alto1aux)
  
  Salidacertera=fuzz.centroid(EejeSalida,Conjuntorecortado)
  
  return Salidacertera


#Reglas de inferencia y defuzzificación de Semáforo vehicular (Este-Oeste)
#W numero de Peatones N/S
#X Numero de Vehiculos N/S
#Y Numero de peatones E/OE
#z Numero de Vehiculos E/OE
def SalidaSV_T_EOE(SP_NS,SP_EOE,SV_NS,SV_EOE,Tiempo_EOE,w,x,y,z,EejeSalida):
  Bajo=[0]*20
  Medio=[0]*29
  Alto=[0]*32
  
  
  Bajo[0]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[1]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[2]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[3]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[4]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[5]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[6]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[7]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[8]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[0][z])
  Bajo[9]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[10]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[11]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[12]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[13]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[14]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[15]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[16]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[17]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[0][z])
  Bajo[18]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Bajo[19]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z])
  
  Medio[0]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Medio[1]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z]) 
  Medio[2]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z]) 
  Medio[3]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[0][z]) 
  Medio[4]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[0][z]) 
  Medio[5]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z]) 
  Medio[6]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z]) 
  Medio[7]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[1][z]) 
  Medio[8]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z]) 
  Medio[9]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z]) 
  Medio[10]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[11]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[12]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[13]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[1][z])
  Medio[14]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[15]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[16]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[17]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[18]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[19]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[20]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[21]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[22]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[1][z])
  Medio[23]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[24]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[25]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[26]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[27]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])
  Medio[28]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[1][z])  

  Alto[0]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[0][z])
  Alto[1]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[0][z]) 
  Alto[2]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z]) 
  Alto[3]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[1][z]) 
  Alto[4]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[1][z]) 
  Alto[5]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z]) 
  Alto[6]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z]) 
  Alto[7]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[0][y],SV_EOE[2][z]) 
  Alto[8]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z]) 
  Alto[9]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z]) 
  Alto[10]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[11]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[12]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[13]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[0][y],SV_EOE[2][z])
  Alto[14]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[15]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[16]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[17]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[18]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[19]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[20]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[21]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[22]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[1][y],SV_EOE[2][z])
  Alto[23]=min(SP_NS[0][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[24]=min(SP_NS[2][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[25]=min(SP_NS[1][w],SV_NS[1][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[26]=min(SP_NS[0][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[27]=min(SP_NS[2][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[28]=min(SP_NS[1][w],SV_NS[0][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[29]=min(SP_NS[0][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[30]=min(SP_NS[2][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])
  Alto[31]=min(SP_NS[1][w],SV_NS[2][x],SP_EOE[2][y],SV_EOE[2][z])

  Bajo1=max(Bajo)
  Medio1=max(Medio)
  Alto1=max(Alto)
  
  
  Bajo1=[Bajo1]*len(Tiempo_EOE[0]) 
  Medio1=[Medio1]*len(Tiempo_EOE[1])
  Alto1=[Alto1]*len(Tiempo_EOE[2])

  Bajo1aux=interseccion1(Bajo1,Tiempo_EOE[0][:])
  Medio1aux=interseccion1(Medio1,Tiempo_EOE[1][:])
  Alto1aux=interseccion1(Alto1,Tiempo_EOE[2][:])
  
  
  ConjuntoRecortado=union1(Bajo1aux,Medio1aux)
  Conjuntorecortado=union1(ConjuntoRecortado,Alto1aux)
  
  Salidacertera=fuzz.centroid(EejeSalida,Conjuntorecortado)
  
  return Salidacertera

##funcion para la deteccion de ambulancias 

def FuncionAmbulancia(NumAmbulancias):
  TiempoExtra=0
  
  if 0<=NumAmbulancias and NumAmbulancias<=3:
    TiempoExtra=10*NumAmbulancias
  else:
    TiempoExtra=20
  return TiempoExtra  
  

#Se requiere determinar donde se detecto la ambulancia 
#SalidaNorteSur y SalidaEsteOeste provienen del sistema difuso
#El caso en que las ambulancias se detecten en ambos sentidos se debe explorar cuando se tenga todo el sistema y se conozca su ciclo de trabajo de toda la red.
def DeteccionAmbulancia(SalidaNorteSur,SalidaEsteOeste,EsNorteSur,EsesteOeste,NumAmbulancias):
  Salida=0
  TiempoExtra=FuncionAmbulancia(NumAmbulancias)
  if EsNorteSur==True:
    Salida=SalidaNorteSur+TiempoExtra
  elif EsesteOeste==True:
    Salida=SalidaEsteOeste+TiempoExtra
  else:
    Salida=max(SalidaNorteSur,SalidaEsteOeste)
  return Salida




#Booleano para mostrar detección de ambulancia en cierta direccion


autos_NS = 10 #int(item.get('Promedio_V_NS'))
peatones_NS = 10 #int(item.get('Promedio_P_NS'))
autos_EOE = 10 #int(item.get('Promedio_V_EOE'))
peatones_EOE = 5 #int(item.get('Promedio_P_EOE'))

NumAmbulancias=2 #int(item.get('Promedio_Ambulancia'))
AmbulanciaNS=True #bool(item.get('Ambulancia_en_NS'))
AmbulanciaEOE=True #bool(item.get('Ambulancia_en_EOE'))



NumP_NS = peatones_NS
NumP_EOE = peatones_EOE
NumV_NS = autos_NS
NumV_EOE = autos_EOE

if NumP_NS < 0 or NumP_NS > 100 or NumP_EOE < 0 or NumP_EOE > 100:
    if NumP_NS < 0:
        NumP_NS =0
            
    if NumP_NS > 100:
        NumP_NS = 100
            
    if NumP_EOE < 0:
        NumP_EOE =0
            
    if NumP_EOE > 100:
        NumP_EOE = 100


if NumV_NS < 0 or NumV_NS > 150 or NumV_EOE < 0 or NumV_EOE > 150:
    if NumV_NS < 0:
        NumV_NS =0
            
    if NumV_NS > 150:
        NumV_NS = 150
            
    if NumV_EOE < 0:
        NumV_EOE=0
            
    if NumV_EOE > 150:
        NumV_EOE = 150

SalidaNS = SalidaSV_T_NS(SP_NS, SP_EOE, SV_NS, SV_EOE, Tiempo_NS, NumP_NS, NumV_NS, NumP_EOE, NumV_EOE, EejeSalida)
SalidaEOE = SalidaSV_T_EOE(SP_NS,SP_EOE,SV_NS,SV_EOE,Tiempo_EOE,NumP_NS,NumV_NS,NumP_EOE,NumV_EOE,EejeSalida)

print("NumV_NS: "+str(NumV_NS))
print("NumP_NS: "+str(NumP_NS))
print("NumV_EOE: "+str(NumV_EOE))
#print("NumP_EOE: "+str(NumP_EOE))

# 2 Salidas del sistema difuso
print("Numero de ambulancias: "+str(NumAmbulancias)+" en (N/S):"+str(AmbulanciaNS)+" en (E/OE):"+ str(AmbulanciaEOE))

print("SalidaNS: "+str(SalidaNS))
print("SalidaEOE: "+str(SalidaEOE))

Salida=DeteccionAmbulancia(SalidaNS,SalidaEOE,AmbulanciaNS,AmbulanciaEOE,NumAmbulancias)
Respuesta= math.ceil(Salida)
print("Resultado final es: "+str(Salida))

## generando json

Newtimecicle ={"TiempoNuevo" : Respuesta}

TiempoTotal = json.dumps(Newtimecicle, indent=4)

#with open('TiempoTotal.json', 'w') as archivo:
#    archivo.write(TiempoTotal)

print("Salida: "+str(Salida))

print("Poniendo json")
print(TiempoTotal)
