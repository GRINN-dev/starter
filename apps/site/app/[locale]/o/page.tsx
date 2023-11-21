"use client"

import { NextPage } from "next";
import { CostGraph } from './_components/CostGraph';
import { Co2Graph } from './_components/Co2Graph';
import { MobilityCostGraph } from './_components/MobilityCostGraph';
import { MobilityEmissionGraph } from './_components/MobilityEmissionGraph';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import RepartitionCostChart from "./_components/RepartitionCostChart";
import RepartitionEmissionChart from "./_components/RepartitionEmissionChart";
import { MoveDown, MoveUp } from "lucide-react";
import { CalendarDatePicker } from "./_components/CalendarDatePicker";

// import Router from "next/router";
// import React, { useEffect } from "react";

const O: NextPage = () => {
  // useEffect(() => {
  //   Router.replace("/");
  // }, []);
  return( 
    
    <div className='flex flex-col'>
            <h1 className="text-3xl font-bold tracking-tight ml-6 my-6">Dashboard</h1>
    <div className="flex mx-6 rounded-xl border bg-card text-card-foreground shadow place-content-around max-w-full">
                <Card className=' flex border-0 rounded-none shadow-none items-center'> 
                  <CardHeader className="px-0 py-6">
                    <CardTitle className="text-2xl font-bold pl-6">
                      200
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row p-0">
                    <div className="text-[#F21866] text-xs px-2"><MoveDown/>12%</div>
                    <p className="text-sm text-muted-foreground">Utilisateurs</p>
                  </CardContent>
                </Card>
                <Card className='flex border-0 rounded-none shadow-none items-center'>
                  <CardHeader className="px-0 py-6">
                    <CardTitle className="text-2xl font-bold pl-6">
                      150
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row p-0">
                  <div className="text-[#F21866] text-xs px-2"><MoveDown/>20.2%</div>
                    <p className="text-sm text-muted-foreground">Véhicules</p>
                  </CardContent>
                </Card>
                <Card className='flex border-0 rounded-none shadow-none items-center'>
                  <CardHeader className="px-0 py-6">
                    <CardTitle className="text-2xl font-bold pl-6">60</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row p-0">
                  <div className="text-[#F21866] text-xs px-2"><MoveDown/>8%</div>
                    <p className="text-xs text-muted-foreground">Titres Mobilités</p>
                  </CardContent>
                </Card>
                <Card className='flex border-0 rounded-none shadow-none items-center'>
                  <CardHeader className="px-0 py-6">
                    <CardTitle className="text-2xl font-bold pl-6">
                      45%
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row p-0">
                  <div className="text-[#59D386] text-xs px-2"><MoveUp/>11.2%</div>
                    <p className="text-sm text-muted-foreground">Obj. de réduction de coûts</p>
                  </CardContent>
                </Card>
                <Card className='flex border-0 rounded-none shadow-none items-center'>
                  <CardHeader className="px-0 py-6">
                    <CardTitle className="text-2xl font-bold pl-6">
                      52.5%
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row p-0">
                  <div className="text-[#59D386] text-xs px-2"><MoveUp/>5.5%</div>
                    <p className="text-sm text-muted-foreground">Obj. de réduction émissions de CO2</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-2">
              <CalendarDatePicker />
            </div>
              <div className="flex max-w-full">
                <Card className="w-1/2 m-6" >
                  <CardHeader>
                    <CardTitle>Coûts</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 m-6">
                    <div className=" flex ">
              <div className='w-1/2 '>
                <h2 className='font-bold mb-5'>
                  Coût total des mobilités
                </h2>
                <MobilityCostGraph />
              </div>
              <div className='w-1/2'>
                <h2 className='font-bold mb-5'>
                  Répartition des coûts
                </h2>
                <RepartitionCostChart />
              </div>
              </div>
              <div>
              <h2 className="font-bold mb-5">
              Évolution
              </h2>
              <CostGraph />
              </div>
                  </CardContent>
                </Card>
                <Card className="w-1/2 m-6">
                  <CardHeader>
                    <CardTitle>Émissions de CO2</CardTitle>
                    <CardDescription>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2 m-6">
                  <div className=" flex">
                    <div className='w-1/2'>
                      <h2 className='font-bold mb-5'>
                  Émission totales des mobilités
                </h2>
                <MobilityEmissionGraph />
              </div>
              <div className='w-1/2 '>
                <h2 className='font-bold mb-5'>
                  Répartition des coûts
                </h2>
                <RepartitionEmissionChart />
              </div>
              </div>
              <h2 className="font-bold mb-5">
              Évolution
              </h2>
              <Co2Graph />
                  </CardContent>
                </Card>
              </div>
        </div>
  )
};

export default O;
