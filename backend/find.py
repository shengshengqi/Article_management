# encoding: utf-8
# from utils import *
# import cv2 as cv
import pickle
import sys
# import pylab as pl
import time
import os


data_des = 'C:/Users/shengqiongyi/Desktop/wt/Article_management/backend/2/data/'
query_img = 'C:/Users/shengqiongyi/Desktop/wt/Article_management/backend/2/test/211.jpg'
train_path = 'C:/Users/shengqiongyi/Desktop/wt/Article_management/backend/2/train/'

if __name__ == '__main__':

    a = time.time()
    file1 = data_des + 'des_list.pickle'
    file2 = data_des + 'SIF2Tdes.pickle'
    file3 = data_des + 'vlad.pickle'

    with open(file1, 'rb') as f:
        des_list = pickle.load(f)

    with open(file2, 'rb') as f:
        SIFTdes = pickle.load(f)

    with open(file3, 'rb') as f:
        vlad = pickle.load(f)

    pics = os.listdir(train_path)
    imgs = get_images_path(train_path, pics)

    tree = balltree(vlad)

    dist, idx = query(query_img, 1, SIFTdes, tree)

    print(imgs[idx[0, 0]][-6:])
    b = time.time()
    # print('使用的时间是:',b - a)
