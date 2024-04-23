package ch.zhaw.gsteidom.djlanimalclassification;

import ai.djl.Device;
import ai.djl.engine.Engine;

public class TestGpu {
    public static void main(String[] args){
        System.out.println("GPU Available: " +  Engine.getInstance().getGpuCount());
    }
}
